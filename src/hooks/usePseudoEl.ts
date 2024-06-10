import { useEffect, useState } from 'react'

export const usePseudoEl = (id: string, rules: string[]) => {
  const [hasOwner, setOwnerShip] = useState(false)
  useEffect(() => {
    if (hasOwner) {
      return
    }
    if (document) {
      const styleSheetExists = document.getElementById(id)
      if (styleSheetExists) {
        setOwnerShip(true)
        return
      }
      addHoverStyle()
    }
    return () => {
      if (document) {
        removeHoverStyle()
      }
    }
  }, [])
  const addHoverStyle = () => {
    const styleEl = document.createElement('style')
    styleEl.id = id
    document.head.appendChild(styleEl)
    const styleSheet = styleEl.sheet
    for (let i = 0; i < rules.length; i++) {
      styleSheet?.insertRule(rules[i]!, 0)
    }
  }
  const removeHoverStyle = () => {
    const styleEl = document.getElementById(id)
    if (styleEl) {
      styleEl.remove()
    }
  }
}
