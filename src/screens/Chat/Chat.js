/* @flow */

import React from 'react'
import styled from 'styled-components'

import { Blankslate } from '../../style-guide'

import Conversations from './Conversations'
import Messages from './Messages'

const StyledConversations = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`

type Props = {
  history: Object,
  match: Object
}

const Chat = ({ history, match }: Props) => {
  const { params: { conversationId } } = match

  const goToConversation = (id) => {
    history.push(`/conversation/${id}`)
  }

  return (
    <StyledConversations>
      <Conversations
        onSelectConversation={id => goToConversation(id)}
        conversationId={conversationId}
      />
      {conversationId
        ? (
          <Messages
            conversationId={conversationId}
          />
        )
        : (
          <Blankslate
            message='No messages, select a conversation.'
          />
        )
      }
    </StyledConversations>
  )
}

export default Chat
