import React from 'react'
import { FlexColumn } from '../containers/Utils'
import { ContextMenu, ContextMenuItem } from './Modal'
import useTarget from '../../../hooks/useTarget'

export const UtilsSuits = () => {
  const [contextMenuCoords, setContextMenuCoords] = React.useState({
    x: 0,
    y: 0,
  })
  const {isTarget:openContextMenu, setIsTarget:setOpenContextMenu, ref} = useTarget(false)
  const handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOpenContextMenu(true)
    setContextMenuCoords({
      x: e.clientX,
      y: e.clientY,
    })
  }
  return (
    <FlexColumn ref={ref}>
      <p onContextMenu={handleOnContextMenu}>RightClickMe</p>
      <ContextMenu
        x={contextMenuCoords.x}
        y={contextMenuCoords.y}
        visible={openContextMenu}
        close={() => console.log('Closed')}

      >
        <ContextMenuItem
          onClick={() => console.log('Clicked')}
          text='Click Me'
          icon={
            <svg
              width='16px'
              height='16px'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            ></svg>
          }
          padding='4px 20px'
          backgroundColor='neutral-100'
          textColor='neutral-100'
        />
      </ContextMenu>
    </FlexColumn>
  )
}
