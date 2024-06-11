import { forwardRef } from 'react'
import { FlexColumn, IconBackgroundNormalizer } from '../containers/Utils'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { CSS_FONTS, CSS_VARS, CSS_VARS_OPTIONS } from '../../../utils/cssVars'
import { clx } from '../../../utils/style'
import { usePseudoEl } from '../../../hooks/usePseudoEl'

export const ModalHelper: React.FC<{
  children: React.ReactNode
  childrenClass?: string
  parentClass?: string
}> = ({ children, childrenClass, parentClass }) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--BLACK1-60)',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'auto',
      }}
      className={`${parentClass ? parentClass : ''}`}
    >
      <div className={`${childrenClass ? childrenClass : ''}`}>{children}</div>
    </div>
  )
}

type ContextMenuProps = {
  children: React.ReactNode
  visible: boolean
  close: () => void
  x: number
  y: number
}

export const ContextMenu: React.ForwardRefExoticComponent<
  ContextMenuProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ContextMenuProps>(({ children, visible, close, x, y }, ref) => {
  usePseudoEl('lassui-contextMenuItem-hover', [
    `.lassui-contextMenuItem:hover {background-color: ${CSS_VARS['ctxMenuBg']};}`,
    `.lassui-contextMenuItem:hover > p {color: ${CSS_VARS['ctxMenuColor']} !important;}`,
  ])
  visible ? disableBodyScroll(document.body) : enableBodyScroll(document.body)
  if (!visible) return null
  const abc = <p></p>
  return (
    <FlexColumn
      ref={ref}
      styles={{
        top: y + 'px',
        left: x + 'px',
        padding: '4px 0',
        width: 'fit-content',
        position: 'fixed',
        zIndex: '100',
        backgroundColor: CSS_VARS['ctxMenuBg'],
        borderRadius: '8px',
        boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.05)',
        border: `px solid ${CSS_VARS['ctxMenuBorder']}`,
      }}
    >
      {children}
    </FlexColumn>
  )
})

export const ContextMenuItem: React.FC<{
  onClick: () => void
  text: string
  icon: React.ReactNode
  padding?: string
  backgroundColor: CSS_VARS_OPTIONS
  textColor: CSS_VARS_OPTIONS
}> = ({ onClick, text, icon, padding, backgroundColor, textColor }) => {
  return (
    <div
      className={clx('lassui-contextMenuItem')}
      style={{
        padding: '4px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        width: '100%',
      }}
      onClick={onClick}
    >
      <IconBackgroundNormalizer
        width='16px'
        backgroundColor={backgroundColor}
        color={textColor}
        padding={padding}
      >
        {icon}
      </IconBackgroundNormalizer>
      <p
        style={{
          fontSize: '12px',
          lineHeight: '16px',
          color: textColor,
          fontWeight: '400',
          fontFamily: CSS_FONTS['Inter'],
          textAlign: 'left',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
}

export const ContextMenuDivider: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: CSS_VARS['ctxMenuBorder'],
        width: '100%',
        margin: 0,
        height: 1,
      }}
    ></div>
  )
}
