import React from 'react'
import { CSS_FONTS, CSS_FONTS_OPTIONS, CSS_VARS, CSS_VARS_OPTIONS } from '../../../utils/cssVars'
type FontFamilyOptions = 'Inter' | 'Lato' | 'Jomhuria'
type TextProps = {
  children: React.ReactNode
  className?: string
}
type OnClick = {
  onClick?: () => void
}
type TextPropsWithSizes = TextProps & {
  fontSize?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  letterSpacing?: string
  textAlign?: React.CSSProperties['textAlign']
  width?: string
  maxWidth?: string
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: CSS_VARS_OPTIONS
  fontFamily?: CSS_FONTS_OPTIONS
  link?: boolean
  lineHeight?: string
}

export const HighLightText: React.FC<TextPropsWithSizes> = ({
  children,
  className,
  fontSize,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  letterSpacing,
  fontWeight,
  color,
  fontFamily,
  link
}) => {
  return (
    <span
      style={{
        fontWeight: fontWeight || '700',
        fontFamily: fontFamily ? CSS_FONTS[fontFamily] : 'unset',
        fontSize: fontSize || '2rem',
        letterSpacing: letterSpacing || '-1.12px',
        marginTop: marginTop || '4px',
        marginBottom: marginBottom || '4px',
        marginLeft: marginLeft || '0',
        marginRight: marginRight || '0',
        color: CSS_VARS[color || 'neutral-900'],
        cursor: link ? 'pointer' : 'inherit',
        textDecoration: link ? 'underline' : 'none',
      }}
      className={className}
    >
      {children}
    </span>
  )
}

export const Text: React.FC<TextPropsWithSizes & OnClick> = ({
  children,
  className,
  fontSize,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  textAlign,
  width,
  maxWidth,
  fontWeight,
  color,
  letterSpacing,
  fontFamily,
  lineHeight,
  onClick,
  link
}) => {
  return (
    <p
      style={{
        fontWeight: fontWeight || '400',
        fontFamily: fontFamily ? CSS_FONTS[fontFamily] : 'unset',
        fontSize: fontSize || '1.6rem',
        lineHeight: lineHeight || '1.9rem',
        marginTop: marginTop || '4px',
        marginBottom: marginBottom || '4px',
        marginLeft: marginLeft || '0',
        marginRight: marginRight || '0',
        textAlign: textAlign || 'left',
        width: width || '100%',
        maxWidth: maxWidth || '100%',
        padding: '0',
        color: CSS_VARS[color || 'neutral-900'],
        letterSpacing: letterSpacing || 'normal',
        cursor: (onClick || link) ? 'pointer' : 'inherit',
        textDecoration: link ? 'underline' : 'none',
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </p>
  )
}
