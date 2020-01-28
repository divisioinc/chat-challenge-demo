/* @flow */

import React from 'react'
import type { Node } from 'react'

import Loader from './Loader'

type Props = {
  loading: boolean,
  children: Node
}

const IsLoading = ({ loading, children }: Props) => (
  loading ? <Loader /> : children
)

export default IsLoading
