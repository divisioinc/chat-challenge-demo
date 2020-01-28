/* @flow */

import React from 'react'
import styled from 'styled-components'

import { white, blue, black } from './colors'
import Text from './Text'

const StyledBubble = styled.div`
  background-color: ${({ direction }) => direction === 'incoming' ? white : blue};
  width: 30%;
  padding: 10px;
  border-radius: 6px;
`

type Props = {
  value: string,
  direction: 'incoming' | 'outgoing',
  style: Object
}

const Bubble = ({ value, direction, style }: Props) => (
  <StyledBubble
    direction={direction}
    style={style}
  >
    <Text
      weight='light'
      color={direction === 'incoming' ? black : white}
    >
      {value}
    </Text>
  </StyledBubble>
)

export default Bubble
