/* @flow */

import React from 'react'
import type { Node } from 'react'
import styled from 'styled-components'

import { grayLight, white } from './colors'

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  border: 1px solid ${grayLight};
  border-radius: 50px;
  overflow: hidden;
`

const StyledInput = styled.input`
  flex: 1;
  height: 38px;
  padding: 0 15px;
  border: 0;
  outline: none;
`

const StyledIcon = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${white};
`

type Props = {
  value: string,
  onChange(): ?void,
  style?: Object,
  icon?: Node,
  placeholder?: string,
  onEnter(): ?void
}

const Input = ({ value = '', onChange, style, icon, placeholder, onEnter }: Props) => {
  const handleKeyUp = ({ keyCode }) => {
    const ENTER = 13

    if (keyCode === ENTER && onEnter) {
      onEnter()
    }
  }

  return (
    <StyledWrapper
      style={style}
    >
      <StyledInputWrapper>
        <StyledInput
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyUp={handleKeyUp}
        />
        {icon && (
          <StyledIcon>{icon}</StyledIcon>
        )}
      </StyledInputWrapper>
    </StyledWrapper>
  )
}

export default Input
