/* @flow */

import React from 'react'
import styled from 'styled-components'

import emptyIcon from '../assets/empty.svg'

import Text from './Text'

const StyledBlankslate = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

type Props = {
  message: string
}

const Blankslate = ({ message }: Props) => (
  <StyledBlankslate>
    <img
      src={emptyIcon}
      alt={message}
      height='200px'
    />
    <Text
      weight='light'
      size={16}
      style={{ marginTop: 20 }}
    >
      {message}
    </Text>
  </StyledBlankslate>
)

export default Blankslate
