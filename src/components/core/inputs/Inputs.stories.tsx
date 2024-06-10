import type { Meta, StoryObj } from '@storybook/react'
import { CLText, CText } from './Inputs'
import React from 'react'
import '../../../styles/globals.css'
import { FormatNumberMask } from '../../../utils/formating/numbers'

const meta: Meta<typeof CLText> = {
  title: 'Core/Inputs',
  component: CLText,
}

export default meta

type Story = StoryObj<typeof meta>

export const CLTextInput: Story = {
  args: {
    type: 'password',
    label: 'Label',

  },
}

const meta2: Meta<typeof CText> = {
    title: 'Core/Inputs',
    component: CText,
    
}

export const CTextInput: StoryObj<typeof meta2> = {
  args: {
    type: 'text',
  },
}