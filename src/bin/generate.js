#!/usr/bin/env node
const { cwd } = require('process')
const fs = require('fs')
const arg = require('arg')
const { resolve } = require('path')

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
    const colorsFileContent = [
      'export const CSS_VARS = {',
      ...varArray.map((varName) => `  '${varName?.replace('--', '')}': 'var(${varName})',`),
      '}',
      'export type CSS_VARS_OPTIONS = keyof typeof CSS_VARS',
    ]
    fs.writeFileSync(resolve(cwd(), 'src/utils/cssVars.ts'), colorsFileContent.join('\n'))
    console.log('CSS vars imported successfully! :)')
    process.exit(0)
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
