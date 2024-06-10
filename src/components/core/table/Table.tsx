import { FlexColumn } from '../containers/Utils'
import Style from './Table.module.css'
import { CSS_VARS, CSS_VARS_OPTIONS } from '../../../utils/cssVars'
import { Prettify } from '../../../types/utils'
import React, { useEffect, useState } from 'react'

type Action = Prettify<{ dataKey: string; action: (data: any) => void }>
type Format = Prettify<{ dataKey: string; format: (data: any) => string | React.ReactNode }>
type Header = Prettify<{ label: string; dataKey: string; width?: string }>[]
type Data = { [key: string]: any }
type CTableProps = Prettify<{
  header: Header
  data: Data[]
  actions: Action[]
  formats: Format[]
  color?: CSS_VARS_OPTIONS
  actionColor?: CSS_VARS_OPTIONS
  maxWidth?: string
  rowHeight?: string
  updating?: boolean
  nextPage?: boolean
}>
type sortObject = {
  dataKey: string
  order: 'asc' | 'desc'
}

export const CTable: React.FC<CTableProps> = ({
  actions,
  data,
  header,
  color,
  actionColor: linkColor,
  maxWidth,
  formats,
  updating,
  rowHeight = '35px',
  nextPage,
}) => {
  const textColor = color || 'white-90'
  const linkColorText = linkColor || ('secondary-blue-200' satisfies CSS_VARS_OPTIONS)
  const dataKeys = header.map((item) => item.dataKey)
  const headerLabels = header.map((item) => item.label)
  const dataKeysLength = dataKeys.length
  useEffect(() => {
    if (document) {
      addBeforeContent()
    }
    return () => {
      if (document) {
        removeBeforeContent()
      }
    }
  }, [])
  const addBeforeContent = () => {
    const styleEl = document.createElement('style')
    styleEl.id = 'table-before-content'
    document.head.appendChild(styleEl)
    const styleSheet = styleEl.sheet
    for (let i = 0; i < dataKeysLength; i++) {
      styleSheet?.insertRule(
        `.${Style.td}:nth-child(${i + 1})::before {content: '${headerLabels[i]}';}`,
        0,
      )
    }
  }
  const removeBeforeContent = () => {
    const styleEl = document.getElementById('table-before-content')
    if (styleEl) {
      styleEl.remove()
    }
  }

  const [sortKey, setSortKey] = useState<sortObject | undefined>(undefined)
  const handleSetSort = (value: string) => {
    console.log(value)
    if (!sortKey || sortKey.dataKey !== value) {
      console.log('set sort asc')
      setSortKey({
        dataKey: value,
        order: 'asc',
      })
      return
    }
    if (sortKey.order === 'desc') {
      console.log('set sort asc')
      setSortKey({
        dataKey: value,
        order: 'asc',
      })
    } else {
      console.log('set sort desc')
      setSortKey({
        dataKey: value,
        order: 'desc',
      })
    }
    return
  }
  return (
    <FlexColumn width='100%' gap='0' maxWidth={maxWidth || '100%'}>
      <table
        style={{
          width: '100%',
          maxWidth: '100%',
          borderCollapse: 'collapse',
          borderSpacing: '0',
        }}
        className={Style.table}
        tabIndex={0}
      >
        {/* <FlexColumn gap='0' margin='10px 0 auto 0' width='fit-content' maxWidth={maxWidth}></FlexColumn> */}
        <TableHeader
          header={header}
          color={textColor}
          rowHeight={rowHeight}
          setSort={handleSetSort}
        />
        <TableBody
          dataKeys={dataKeys}
          data={data}
          action={actions}
          format={formats}
          color={textColor}
          linkColor={linkColorText}
          rowHeight={rowHeight}
          sortKey={sortKey}
        />
      </table>
      {/* <TableFooter nextPage={nextPage} loading={updating} /> */}
    </FlexColumn>
  )
}

type TableHeaderProps = {
  header: Header
  color: CSS_VARS_OPTIONS
  rowHeight: string
  setSort: (key: string) => void
}
const TableHeader: React.FC<TableHeaderProps> = ({ color, header, rowHeight, setSort }) => {
  return (
    // <FlexRow gap='0' height={rowHeight} className={Style.dividerBorder} verticalAlign='center'>
    <thead className={Style.thead}>
      <tr>
        {header.map((item) => (
          <TableHeaderCell
            key={item.dataKey}
            color={color}
            label={item.label}
            width={item.width}
            setSort={setSort}
            dataKey={item.dataKey}
          />
        ))}
      </tr>
    </thead>
    // </FlexRow>
  )
}

type TableHeaderCellProps = {
  color: CSS_VARS_OPTIONS
  label: string
  width?: string
  setSort: (key: string) => void
  dataKey: string
}
const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label, color, setSort, dataKey }) => {
  return (
    // <FlexRow width={width} horizontalAlign='flex-start' verticalAlign='center'>
    // <CommonText fontSize='12px' lineHeight='18px' fontWeight='600' color={color} textAlign='left'>
    <th
      className={Style.th}
      style={{
        color: CSS_VARS[color],
      }}
      onClick={() => setSort(dataKey)}
    >
      {label}
    </th>
    // </CommonText>
    // </FlexRow>
  )
}

type TableBodyProps = {
  dataKeys: string[]
  data: Data[]
  action: Action[]
  format: Format[]
  color: CSS_VARS_OPTIONS
  linkColor: CSS_VARS_OPTIONS
  rowHeight: string
  sortKey?: sortObject
}
const TableBody: React.FC<TableBodyProps> = ({
  action,
  color,
  data,
  dataKeys,
  format,
  linkColor,
  rowHeight,
  sortKey,
}) => {
  return (
    // <FlexColumn gap='0' margin='10px 0 auto 0' width='fit-content'>
    <tbody className={Style.tbody}>
      {data
        .sort((a, b) => {
          if (!sortKey || typeof a[sortKey.dataKey] !== typeof b[sortKey.dataKey]) return 0

          if (sortKey.order === 'asc') {
            if (typeof a[sortKey.dataKey] === 'string' && typeof b[sortKey.dataKey] === 'string') {
              return a[sortKey.dataKey].localeCompare(b[sortKey.dataKey])
            }
            return a[sortKey.dataKey] > b[sortKey.dataKey] ? 1 : -1
          } else {
            if (typeof a[sortKey.dataKey] === 'string' && typeof b[sortKey.dataKey] === 'string') {
              return a[sortKey.dataKey].localeCompare(b[sortKey.dataKey]) * -1
            }
            return a[sortKey.dataKey] < b[sortKey.dataKey] ? 1 : -1
          }
        })
        .map((item) => (
          <TableBodyRow
            key={item.id}
            data={item}
            dataKeys={dataKeys}
            action={action}
            format={format}
            color={color}
            linkColor={linkColor}
            rowHeight={rowHeight}
          />
        ))}
    </tbody>
    // </FlexColumn>
  )
}

type TableBodyRowProps = {
  dataKeys: string[]
  data: Data
  action: Action[]
  format: Format[]
  color: CSS_VARS_OPTIONS
  linkColor: CSS_VARS_OPTIONS
  rowHeight: string
}
const TableBodyRow: React.FC<TableBodyRowProps> = ({
  action,
  color,
  data,
  dataKeys,
  format,
  linkColor,
  rowHeight,
}) => {
  return (
    // <FlexRow gap='0' height={rowHeight} className={Style.dividerBorder} verticalAlign='center'>
    <tr className={Style.tr}>
      {dataKeys.map((key) => {
        const actionItem = action.find((item) => item.dataKey === key)
        const formatItem = format.find((item) => item.dataKey === key)
        if (!data[key] && data[key] !== 0 && typeof data[key] !== 'boolean')
          throw new Error('Data key not found:' + key)
        return (
          <TableBodyCell
            key={key}
            color={color}
            value={data[key]}
            action={actionItem ? actionItem.action : undefined}
            linkColor={linkColor}
            format={formatItem ? formatItem.format : undefined}
          />
        )
      })}
    </tr>
    // </FlexRow>
  )
}

type TableBodyCellProps = {
  value: string | number | Date
  color: CSS_VARS_OPTIONS
  action?: (value?:any) => void
  linkColor: CSS_VARS_OPTIONS
  format?: (value: any) => string | React.ReactNode
}
const TableBodyCell: React.FC<TableBodyCellProps> = ({
  color,
  value,
  action,
  linkColor,
  format,
}) => {
  if(Object.prototype.toString.call(value) === '[object Date]') {
    const assertDate = value as Date
    return (
      <td
        style={{
          color: CSS_VARS[action ? linkColor : color],
          cursor: action ? 'pointer' : 'default',
          textDecoration: action ? 'underline' : 'none',
        }}
        className={Style.td}
        onClick={() => action && action(value)}
      >
        {format ? format(value) : assertDate.toLocaleDateString()}
      </td>
    )
  }
  return (
    <td
      style={{
        color: CSS_VARS[action ? linkColor : color],
        cursor: action ? 'pointer' : 'default',
        textDecoration: action ? 'underline' : 'none',
      }}
      className={Style.td}
      onClick={() => action && action(value)}
    >
      {/* @ts-ignore */}
      {format ? format(value) : value}
    </td>
    // </FlexRow>
  )
}

// type TableFooterProps = {
//   nextPage?: boolean
//   loading?: boolean
// }
// const TableFooter: React.FC<TableFooterProps> = ({ nextPage, loading }) => {
//   const router = useRouter()
//   const limit = typeof router.query.limit === 'string' ? parseInt(router.query.limit) : 10
//   return (
//     <FlexRow verticalAlign='center' horizontalAlign='space-between' padding='10px 0 0 0'>
//       <FlexRow verticalAlign='center' horizontalAlign='flex-start' gap='8px'>
//         <CommonText fontSize='14px' color='white-90' width='fit-content'>
//           Linhas por página:
//         </CommonText>
//         <FlexRow width='45px'>
//           <SelectIntCustomMini
//             SelectConfig={{
//               nameKey: 'name',
//               optionValueKey: 'value',
//               options: [
//                 { name: '10', value: '10' },
//                 { name: '20', value: '20' },
//                 { name: '50', value: '50' },
//               ],
//             }}
//             defaultValue={limit}
//             setCurrentSelected={(value) => {
//               router.push({
//                 query: {
//                   ...router.query,
//                   limit: value,
//                 },
//               })
//             }}
//             // label='Linhas por página:'
//             // filled={false}
//             // color='white-90'
//           />
//         </FlexRow>
//         {loading && <LoadingZero width={20} />}
//       </FlexRow>
//       <FlexRow verticalAlign='center' horizontalAlign='flex-end'>
//         <PaginationFooter next={nextPage} />
//       </FlexRow>
//     </FlexRow>
//   )
// }

// type PaginationProps = {
//   next?: boolean
// }
// const PaginationFooter: React.FC<PaginationProps> = ({ next }) => {
//   const router = useRouter()
//   const currentPage = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1

//   const pages = Array.from(
//     { length: currentPage > 5 ? 5 : currentPage },
//     (_, i) => currentPage - i,
//   ).reverse()
//   return (
//     <FlexRow width='fit-content' horizontalAlign='center' verticalAlign='center' gap='8px'>
//       <AngleLeftIcon
//         enabled={currentPage > 1}
//         onClick={
//           currentPage > 1
//             ? () => router.push({ query: { ...router.query, page: currentPage - 1 } })
//             : undefined
//         }
//       />
//       <PaginationNumber number={1} />
//       {pages.map((page) => {
//         if (page < 1) return null
//         if (page === 1) return null
//         return <PaginationNumber key={page} number={page} />
//       })}

//       <AngleRightIcon
//         enabled={next}
//         onClick={
//           next
//             ? () => router.push({ query: { ...router.query, page: currentPage + 1 } })
//             : undefined
//         }
//       />
//     </FlexRow>
//   )
// }

// const PaginationNumber: React.FC<{ number: number }> = ({ number }) => {
//   const router = useRouter()
//   const currentPage = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1
//   return (
//     <CommonText
//       onClick={() => router.push({ query: { ...router.query, page: number } })}
//       fontSize='14px'
//       color={currentPage === number ? 'white-90' : 'white-60'}
//       fontWeight={currentPage === number ? '700' : '400'}
//       className={currentPage === number ? Style.paginationNumber : undefined}
//       width='fit-content'
//       marginBottom='0'
//       marginTop='0'
//       lineHeight='14px'
//     >
//       {number}
//     </CommonText>
//   )
// }
