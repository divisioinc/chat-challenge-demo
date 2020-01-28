/* @flow */

import React from 'react'
import styled from 'styled-components'

import { blue } from './colors'

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  width?: number,
  height?: number,
  color?: string
}

const Loader = ({ width = 50, height = 50, color = blue }: Props) => (
  <StyledLoader>
    <svg
      width={width}
      height={height}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      style={{ background: 'none' }}
    >
      <path
        stroke='none'
        d='M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50'
        fill={color}
        transform='rotate(334.871 50 51)'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          calcMode='linear'
          values='0 50 51;360 50 51'
          keyTimes='0;1'
          dur='1.2s'
          begin='0s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  </StyledLoader>
)

export default Loader
