import type { Meta, StoryObj } from '@storybook/react'
import { Test } from './index'

const meta: Meta<typeof Test> = {
  title: 'Table/Core',
  component: Test,
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Matheus',
  },
}
