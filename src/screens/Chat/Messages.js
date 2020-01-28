/* @flow */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import shortId from 'shortid'

import sendIcon from '../../assets/send.svg'

import { IsLoading, Input } from '../../style-guide'
import { graySemiLight } from '../../style-guide/colors'

import api from '../../utils/api'

import MessageItem from './MessageItem'

const StyledMessages = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const MessagesContainer = styled.div`
  flex: 1;
  flex-shrink: 0;
  padding: 20px 40px;
  overflow-y: auto;
`

const StyledSendButton = styled.button`
  border: 0;
  outline: none;
  padding: 0;
  margin-left: 15px;
  cursor: pointer;
  background-color: transparent;
`

const StyledIcon = styled.img`
  width: 32px;
`

const StyledFooter = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 15px;
  background-color: ${graySemiLight};
`

type Props = {
  conversationId: string
}

const useFetchMessages = (conversationId: string) => {
  const [isFetching, setFetching] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      setFetching(true)

      const { data: { data: { messages } } } = await api.get(`/conversations/${conversationId}`)

      setMessages(messages)
      setFetching(false)
    }

    fetchMessages()
  }, [conversationId])

  return { isFetching, messages, setMessages }
}

const Messages = ({ conversationId }: Props) => {
  const { isFetching, messages, setMessages } = useFetchMessages(conversationId)
  const [text, setText] = useState('')

  const createMessage = () => {
    if (!text) return

    setText('')
    setMessages([
      ...messages,
      {
        uuid: shortId.generate(),
        body: text,
        direction: 'outgoing',
        created_at: new Date().toISOString()
      }
    ])
  }

  return (
    <StyledMessages>
      <IsLoading loading={isFetching}>
        <MessagesContainer>
          {messages.map(({ uuid, body, direction }) => (
            <MessageItem
              key={uuid}
              message={body}
              direction={direction}
            />
          ))}
        </MessagesContainer>
      </IsLoading>
      <StyledFooter>
        <Input
          value={text}
          onChange={({ target: { value } }) => setText(value)}
          onEnter={createMessage}
          placeholder='Type a message'
        />
        <StyledSendButton onClick={createMessage}>
          <StyledIcon src={sendIcon} />
        </StyledSendButton>
      </StyledFooter>
    </StyledMessages>
  )
}

export default Messages
