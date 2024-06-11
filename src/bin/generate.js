#!/usr/bin/env node
const { cwd } = require('process')
const fs = require('fs')
const arg = require('arg')
const { resolve } = require('path')
const DEFAULT_VARS = {
  'white-30': 'rgba(255, 253, 255, 0.3)',
  'white-90': 'rgba(255, 253, 255, 0.9)',
  'white-20': 'rgba(255, 253, 255, 0.2)',
  'secondary-orange-200': '#EBB4A2',
  'secondary-orange-400': '#C26040',
  'neutral-300': '#727F8A',
  'neutral-500': '#212D37',
  'neutral-600': '#16232E',
  'neutral-700': '#0C1924',
  'neutral-900': '#01080E',
  'primary-500': '#58A46E',
  'ctxMenuBg': '#017D73B2',
  'ctxMenuColor': '#fff',
  'ctxMenuBorder': '#DFDFDF',
  'transparent': 'transparent',
  'secondary-blue-200': '#BDD6FF',
}

const DEFAULT_FONTS = {
  'Inter': 'Inter ,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
}

const args = arg(
  {
    '--path': [String],
  },
  {
    permissive: false,
  },
)

const path = args['--path']

if (!path) {
  console.error('You need to provide a path to the file you want to generate')
  process.exit(1)
}
try {
  const varArray = []
  for (let i = 0; i < path.length; i++) {
    const filePath = path[i]
    if (!filePath) {
      console.error('The path argument is invalid. Did you input any blank spaces?')
      process.exit(1)
    }
    const fileContent = fs.readFileSync(resolve(cwd(), filePath), 'utf8').split('\n')
    for (let j = 0; j < fileContent.length; j++) {
      const line = fileContent[j]
      if (!line) {
        console.log('Skipping line number: ' + (j + 1))
        continue
      }
      if (line.trimStart().startsWith('--')) {
        const [varName] = line.trimStart().split(':')
        console.log('Generating CSS variable: ' + varName)
        varArray.push(varName)
      }
    }
  }
  const varFontArray = varArray.filter((varName) => varName?.startsWith('--font'))
  const defaultFontsFileContent = Object.keys(DEFAULT_FONTS).map((keyName) => `  '${keyName}': '${DEFAULT_FONTS[keyName]}',`)
  const defaultVarsFileContent = Object.keys(DEFAULT_VARS).filter((keyName) => !varArray.includes(`--${keyName}`)).map(
    (keyName) => `  '${keyName}': '${DEFAULT_VARS[keyName]}',`,
  )

  const colorsFileContent = [
    'export const CSS_VARS = {',
    ...defaultVarsFileContent,
    ...varArray
      .filter((varName) => !varName?.startsWith('--font'))
      .map((varName) => `  '${varName?.replace('--', '')}': 'var(${varName})',`),
    '}',
    'export type CSS_VARS_OPTIONS = keyof typeof CSS_VARS',
    'export const CSS_FONTS = {',
    ...defaultFontsFileContent,
    ...varFontArray.map((varName) => `  '${varName?.replace('--', '')}': 'var(${varName})',`),
    '}',
    'export type CSS_FONTS_OPTIONS = keyof typeof CSS_FONTS',
  ]
  fs.writeFileSync(resolve(cwd(), 'src/utils/cssVars.ts'), colorsFileContent.join('\n'))
  if (varFontArray.length === 0) {
    console.warn(
      'No font family variables found. Please add a font family variable to your CSS file with the --font prefix, so you can have intellisense for the font family in your code.',
    )
  }
  console.log('CSS vars imported successfully! :)')
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
