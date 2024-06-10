import type { Meta, StoryObj } from '@storybook/react'
import { CTable } from './Table'
import React from 'react'
import '../../../styles/globals.css'
import { FormatNumberMask } from '../../../utils/formating/numbers'

const meta: Meta<typeof CTable> = {
  title: 'Table/Core',
  component: CTable,
}

export default meta

type Story = StoryObj<typeof meta>
// Generate random data for each object inside data array
const data = [
  {
    id: 1,
    name: 'Matheus',
    email: 'bmatheus@gmail.com',
    balance: 200,
    status: 'active',
    createdAt: new Date('2022-01-08'),
  },
  {
    id: 2,
    name: 'cLuke',
    email: 'luke@gmail.com',
    balance: 100,
    status: 'inactive',
    createdAt: new Date('2022-01-07'),
  },
  {
    id: 3,
    name: 'John',
    email: 'ajohn@gmail.com',
    balance: 300,
    status: 'active',
    createdAt: new Date('2022-01-06'),
  },
  {
    id: 4,
    name: 'Jane',
    email: 'djane@gmail.com',
    balance: 400,
    status: 'inactive',
    createdAt: new Date('2022-01-05'),
  },
  {
    id: 5,
    name: 'Paul',
    email: 'paul@gmail.com',
    balance: 500,
    status: 'active',
    createdAt: new Date('2022-01-04'),
  },
  {
    id: 6,
    name: 'Maria',
    email: 'maria@gmail.com',
    balance: 600,
    status: 'inactive',
    createdAt: new Date('2022-01-03'),
  },
  {
    id: 7,
    name: 'Carlos',
    email: 'carlos@gmail.com',
    balance: 700,
    status: 'active',
    createdAt: new Date('2022-01-02'),
  },
  {
    id: 8,
    name: 'Pedro',
    email: 'pedro@gmail.com',
    balance: 800,
    status: 'inactive',
    createdAt: new Date('2022-01-01'),
  },
]

const header = [
  {
    label: 'Name',
    dataKey: 'name',
  },
  {
    label: 'Email',
    dataKey: 'email',
  },
  {
    label: 'Balance',
    dataKey: 'balance',
  },
  {
    label: 'Status',
    dataKey: 'status',
  },
  {
    label: 'Created At',
    dataKey: 'createdAt',
  },
]

const formats = [
  {
    dataKey: 'balance',
    format: (value: number) => FormatNumberMask(value, 'R$'),
  },
]

export const Table: Story = {
  args: {
    data: data,
    header: header,
    actions: [],
    formats: formats,
    maxWidth: '1000px',
  },
}
