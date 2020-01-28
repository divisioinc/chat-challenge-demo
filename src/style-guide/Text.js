/* @flow */

import React from 'react'
import type { Node } from 'react'
import styled from 'styled-components'

const weightValues = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700
}

const StyledText = styled.span`
  font-weight: ${({ weight }) => weightValues[weight]};
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
`

type Props = {
  weight: 'light' | 'regular' | 'medium' | 'bold',
  size?: number,
  color?: string,
  children: Node,
  style?: Object,
  className?: string,
  title?: string
}

const Text = ({ weight, size = 14, color, children, style, className, title }: Props) => (
  <StyledText
    weight={weight}
    size={size}
    color={color}
    style={style}
    className={className}
    title={title}
  >
    {children}
  </StyledText>
)

export default Text
