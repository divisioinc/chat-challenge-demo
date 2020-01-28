/* @flow */

import React from 'react'
import styled from 'styled-components'

import { Bubble } from '../../style-guide'

const StyledMessage = styled.div`
  display: flex;
  justify-content: ${({ direction }) => direction === 'incoming' ? 'flex-start' : 'flex-end'};
`

type Props = {
  message: string,
  direction: 'incoming' | 'outgoing'
}

const MessageItem = ({ message, direction }: Props) => (
  <StyledMessage direction={direction}>
    <Bubble
      value={message}
      direction={direction}
      style={{ marginTop: 10 }}
    />
  </StyledMessage>
)

export default MessageItem
