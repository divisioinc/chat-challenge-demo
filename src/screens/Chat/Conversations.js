/* @flow */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import searchIcon from '../../assets/search.svg'

import { IsLoading, Input, Blankslate } from '../../style-guide'
import { smoke, white, graySemiLight } from '../../style-guide/colors'

import { API } from 'aws-amplify';

import ConversationItem from './ConversationItem'

const StyledConversations = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid ${smoke};
  background-color: ${white};
  overflow-y: auto;
  flex-shrink: 0;
`

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 15px;
  background-color: ${graySemiLight};
`

type Props = {
  conversationId: string,
  onSelectConversation(id: string): void
}

const useFetchConversations = () => {
  const [isFetching, setFetching] = useState(true)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await API.get('conversations', '/conversations');

      setConversations(data)
      setFetching(false)
    }

    fetchConversations()
  }, [])

  return { isFetching, conversations }
}

const Conversations = ({ conversationId, onSelectConversation }: Props) => {
  const { isFetching, conversations } = useFetchConversations()
  const [textSearch, setTextSearch] = useState('')

  const filteredConversations = conversations
    .filter(({ name }) => name.toLowerCase().includes(textSearch))
    .sort((a, b) => {
      const aDate = new Date(a.lastMessage.createdAt)
      const bDate = new Date(b.lastMessage.createdAt)

      return bDate - aDate
    })

  return (
    <StyledConversations>
      <IsLoading loading={isFetching}>
        <StyledHeader>
          <Input
            placeholder='Search for a conversation'
            value={textSearch}
            icon={<img src={searchIcon} alt='Search for a conversation' />}
            onChange={({ target: { value } }) => setTextSearch(value)}
          />
        </StyledHeader>
        {filteredConversations.length
          ? (
            filteredConversations.map(({ uuid, name, unread, lastMessage }) => (
              <ConversationItem
                key={uuid}
                name={name}
                unread={unread}
                lastMessage={lastMessage}
                onClick={() => onSelectConversation(uuid)}
                isSelected={conversationId === uuid}
              />
            ))
          )
          : (
            <Blankslate
              message='No conversations found'
            />
          )
        }
      </IsLoading>
    </StyledConversations>
  )
}

export default Conversations
