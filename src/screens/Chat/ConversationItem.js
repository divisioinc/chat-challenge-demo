/* @flow */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { smoke, white, blue } from '../../style-guide/colors'
import { fromDate } from '../../utils/date'
import { Text } from '../../style-guide'

const StyledConversationItem = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${smoke};
  justify-content: space-between;
  cursor: pointer;
  transition: background-color .1s ease-in;
  background-color: ${({ isSelected }) => isSelected ? smoke : white};

  &:hover {
    background-color: ${smoke};
  }
`

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const StyledDateCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StyledCounter = styled.span`
  margin-top: 10px;
  background-color: ${blue};
  border-radius: 20px;
  height: 20px;
  width: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 300;
`

const StyledMessage = styled(Text)`
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

type Props = {
  name: string,
  unread: number,
  lastMessage: LastMessage,
  isSelected: boolean,
  onClick(): void
}

/* Local control for read messages */
const useReadMessagesControl = (unread, isConversationSelected) => {
  const [unreadMessages, setUnreadMessages] = useState(unread)
  const resetUnreadMessages = () => setUnreadMessages(0)

  useEffect(() => {
    if (isConversationSelected) {
      resetUnreadMessages()
    }
  }, [])

  return { unreadMessages, resetUnreadMessages }
}

const ConversationItem = ({ name, unread, lastMessage, isSelected, onClick }: Props) => {
  const { unreadMessages, resetUnreadMessages } = useReadMessagesControl(unread, isSelected)

  const onItemClick = () => {
    onClick()
    resetUnreadMessages()
  }

  return (
    <StyledConversationItem
      isSelected={isSelected}
      onClick={onItemClick}
    >
      <StyledInfo>
        <Text weight='medium'>
          {name}
        </Text>
        <StyledMessage title={lastMessage.body}>
          {lastMessage.body}
        </StyledMessage>
      </StyledInfo>
      <StyledDateCount>
        <Text
          weight='light'
          size={12}
        >
          {fromDate(lastMessage.created_at)}
        </Text>
        {!!unreadMessages && (
          <StyledCounter
            style={{ marginTop: 10 }}
            weight='light'
            size={12}
          >
            {unreadMessages}
          </StyledCounter>
        )}
      </StyledDateCount>
    </StyledConversationItem>
  )
}

export default ConversationItem
