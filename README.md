# (WIP) Heavily opinionated UI library for React

Kinda inspired by tailwind in the sense that you don't have to go look at CSS files for basic styling, but also maintains the need of CSS files for more complex styling, toggles, style propagation, etc.

tl;dr

#### - InteliSense for CSS variables
#### - Basic styling as prop for most components
#### - Named DIVs for fast structure. e.g: `<FlexRow />`, `<FlexColumn />`
#### - Custom Utility Components. e.g: `<Loading />`, `<ModalHelper />`
#### - Custom Input Components. e.g: `<CurrencyInput />`, `<SelectIntCustom />`, `<SelectIntCards />`, `<SelectIntFromQuery />`, `<SelectFromRange />`
#### - Custom Table Component. e.g: `<CTable />` (Yes, only one and you'll have a table! :O)

It's  a WIP, so the setup for you to bring your own CSS variables is not yet implemented. You would have to create variables with the same name as the ones in colors.ts.

## GOALS:
#### - Provide an easy way to bring your own palette of colors and change most of the visuals. E.G: colors, border radius, font size, etc.
#### - Provide a way to easily toggle between dark and light mode.
#### - Bring the boredom of making Tables, Forms, Inputs, etc. as close do zero as possible.
#### - Make so you can tweak everything by some prop or config, idk, so you don't have to fear being unable to do something because of the library.

Reminders(for myself):
- Make it so it's easily replaceable in the future. Without lock-in.
- Make a lazy script that will include generated CSS variables. 