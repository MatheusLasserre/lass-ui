import type { Meta, StoryObj } from '@storybook/react'
import { InputsTest, InputsTest2 } from './CustomInputs'

const meta: Meta<typeof InputsTest> = {
  title: 'Core/Tests',
  component: InputsTest,
}

export default meta

type Story = StoryObj<typeof meta>

export const Tests: Story = {
  args: {
  },
}

const meta2: Meta<typeof InputsTest2> = {
  title: 'Core/Abra',
  component: InputsTest2,
}


type Story2 = StoryObj<typeof meta2>

export const Abrak: Story2 = {
  args: {
  },
}