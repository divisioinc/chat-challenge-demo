/* @flow */

import { formatDistance } from 'date-fns'

export const fromDate = (dateStart: string): string => (
  formatDistance(
    new Date(dateStart),
    new Date()
  )
)
