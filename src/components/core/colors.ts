/**
 * We gonna have at least:
 * 1: Brand Colors
 *  1.1: Buttons, Links, Icons, Navigation.
 * Comment: e.g Facebook Blue
 * 2: Supporting Colors
 * 1.1: Errors, Confirmation, Warnings, Information
 * Comment: Few Places that you need to draw attention to. Used less often than Brand Colors.
 * 3: Neutral Colors
 * 3.1: Background, Text, Borders, Secondary Buttons.
 * Comment: Used for the majority of the design.
 *
 * Step-by-Step: https://www.figma.com/design/JpbVaPfUUqtQu0GAEbPRmq/Color-tester?node-id=0-1&t=guEZr13oTFknO53B-0
 */

export const CSS_VARS = {
  'primary-100': 'var(--primary-100)',
  'primary-200': 'var(--primary-200)',
  'primary-300': 'var(--primary-300)',
  'primary-400': 'var(--primary-400)',
  'primary-500': 'var(--primary-500)',
  'primary-600': 'var(--primary-600)',
  'primary-700': 'var(--primary-700)',
  'primary-800': 'var(--primary-800)',
  'primary-900': 'var(--primary-900)',
  'secondary-blue-100': 'var(--secondary-blue-100)',
  'secondary-blue-200': 'var(--secondary-blue-200)',
  'secondary-blue-300': 'var(--secondary-blue-300)',
  'secondary-blue-400': 'var(--secondary-blue-400)',
  'secondary-blue-500': 'var(--secondary-blue-500)',
  'secondary-blue-600': 'var(--secondary-blue-600)',
  'secondary-blue-700': 'var(--secondary-blue-700)',
  'secondary-blue-800': 'var(--secondary-blue-800)',
  'secondary-blue-900': 'var(--secondary-blue-900)',
  'secondary-red-100': 'var(--secondary-red-100)',
  'secondary-red-200': 'var(--secondary-red-200)',
  'secondary-red-300': 'var(--secondary-red-300)',
  'secondary-red-400': 'var(--secondary-red-400)',
  'secondary-red-500': 'var(--secondary-red-500)',
  'secondary-red-600': 'var(--secondary-red-600)',
  'secondary-red-700': 'var(--secondary-red-700)',
  'secondary-red-800': 'var(--secondary-red-800)',
  'secondary-red-900': 'var(--secondary-red-900)',
  'secondary-orange-100': 'var(--secondary-orange-100)',
  'secondary-orange-200': 'var(--secondary-orange-200)',
  'secondary-orange-300': 'var(--secondary-orange-300)',
  'secondary-orange-400': 'var(--secondary-orange-400)',
  'secondary-orange-500': 'var(--secondary-orange-500)',
  'secondary-orange-600': 'var(--secondary-orange-600)',
  'secondary-orange-700': 'var(--secondary-orange-700)',
  'secondary-orange-800': 'var(--secondary-orange-800)',
  'secondary-orange-900': 'var(--secondary-orange-900)',
  'neutral-100': 'var(--neutral-100)',
  'neutral-200': 'var(--neutral-200)',
  'neutral-300': 'var(--neutral-300)',
  'neutral-400': 'var(--neutral-400)',
  'neutral-500': 'var(--neutral-500)',
  'neutral-600': 'var(--neutral-600)',
  'neutral-700': 'var(--neutral-700)',
  'neutral-800': 'var(--neutral-800)',
  'neutral-900': 'var(--neutral-900)',
  'white-100': 'var(--white-100)',
  'white-90': 'var(--white-90)',
  'white-80': 'var(--white-80)',
  'white-70': 'var(--white-70)',
  'white-60': 'var(--white-60)',
  'white-50': 'var(--white-50)',
  'white-40': 'var(--white-40)',
  'white-30': 'var(--white-30)',
  'white-20': 'var(--white-20)',
  'white-10': 'var(--white-10)',
  'transparent': 'transparent',
}

export type CSS_VARS_OPTIONS = keyof typeof CSS_VARS
