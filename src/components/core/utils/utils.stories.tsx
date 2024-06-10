import type { Meta, StoryObj } from '@storybook/react'
import { UtilsSuits } from './UtilsSuits'
import React from 'react'
import '../../../styles/globals.css'
import { FormatNumberMask } from '../../../utils/formating/numbers'

const meta: Meta<typeof UtilsSuits> = {
  title: 'Core/Utils',
  component: UtilsSuits,
}

export default meta

type Story = StoryObj<typeof meta>
// Generate random data for each object inside data array

export const ContextMenu: Story = {
  args: {},
}
