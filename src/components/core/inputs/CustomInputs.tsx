import {useState } from 'react'
import useTarget from '../../../hooks/useTarget'
import {
  FormatNumberMask,
  NumberStringToNumber,
  handleValueInputChange,
  padWithLeadingZeros,
} from '../../../utils/formating/numbers'
import Style from './CustomInputs.module.css'
import { CFalseText, CText } from '../inputs/Inputs'
import { AngleUpIcon } from '../../assets/Icons'
import { clx } from '../../../utils/style'
import { Prettify } from '../../../types/utils'

type CurrencyInputProps = {
  currencyValue: number
  setCurrencyValue: (currencyValue: number) => void
  className?: string
  maxLength?: number
  placeholder?: string
  currencySymbol?: string
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  className,
  currencyValue,
  setCurrencyValue,
  currencySymbol,
  maxLength,
  placeholder,
}) => {
  const [editValueString, setEditValueString] = useState(
    FormatNumberMask(currencyValue, currencySymbol),
  )
  const handleEditTransferAmountChange = (value: string) => {
    setEditValueString(handleValueInputChange(value, currencyValue))
    setCurrencyValue(NumberStringToNumber(value))
  }

  return (
    <CText
      value={editValueString}
      onChange={(e) => handleEditTransferAmountChange(e.currentTarget.value)}
      required
      type='text'
      name='value'
      id='value'
      placeholder={placeholder}
      maxLength={maxLength}
      className={clx(className, Style.currencyBeforeInput)}
    />
  )
}

type CLCurrencyInputProps = {
  currencyValue: number
  setCurrencyValue: (currencyValue: number) => void
  label: string
  labelClassName?: string
  className?: string
  maxLength?: number
  placeholder?: string
  currencySymbol?: string
}

export const CLCurrencyInput: React.FC<CLCurrencyInputProps> = ({
  currencyValue,
  setCurrencyValue,
  label,
  labelClassName,
  className,
  maxLength,
  placeholder,
  currencySymbol,
}) => {
  return (
    <label className={clx(labelClassName || Style.label, Style.currencyBefore)}>
      {label}
      <CurrencyInput
        currencyValue={currencyValue}
        setCurrencyValue={setCurrencyValue}
        className={className}
        maxLength={maxLength}
        placeholder={placeholder}
        currencySymbol={currencySymbol}
      />
    </label>
  )
}

type SelectConfig = {
  options: Array<{
    [key: string]: any
  }>
  nameKey: string
  optionValueKey: string
}

type SelectIntProps = Prettify<{
  SelectConfig: SelectConfig
  setCurrentSelected: React.Dispatch<number>
  defaultValue?: number
  selectedValue?: number | null
}>

export const SelectIntCustom: React.FC<
  SelectIntProps
> = ({ SelectConfig, setCurrentSelected, defaultValue, selectedValue }) => {
  const { isTarget, ref, setIsTarget } = useTarget(false)
  return (
    <div className={Style.contentWrapper} ref={ref}>
      <CFalseText
        text={
          selectedValue
            ? SelectConfig.options.find(
                (option) => Number(option[SelectConfig.optionValueKey]) === selectedValue,
              )?.[SelectConfig.nameKey]
            : SelectConfig.options.find(
                (option) => Number(option[SelectConfig.optionValueKey]) === defaultValue,
              )?.[SelectConfig.nameKey] || 'Selecione'
        }
        onClick={() => setIsTarget(!isTarget)}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
        }}
      >
        <AngleUpIcon color={'white-90'} toggle={!isTarget} onClick={() => setIsTarget(!isTarget)} />
      </div>
      {isTarget && (
        <div className={Style.SICOptions}>
          {SelectConfig.options.map((element, index) => {
            return (
              <div
                key={`${element[SelectConfig.optionValueKey]}${index}`}
                onClick={() => {
                  setCurrentSelected(Number(element[SelectConfig.optionValueKey]))
                  setIsTarget(false)
                }}
                className={Style.SICItem}
              >
                <p className={Style.SICItemLabel}>{element[SelectConfig.nameKey]}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
type SelectFromRangeProps = Prettify<{
  selectedValue?: number | null
  range: [number, number]
  leadingZeros?: number
  setCurrentSelected: (value: number) => void
}>
export const SelectFromRange: React.FC<SelectFromRangeProps> = ({
  setCurrentSelected,
  selectedValue,
  range,
  leadingZeros,
}) => {
  const { isTarget, ref, setIsTarget } = useTarget(false)
  return (
    <div className={Style.contentWrapper} ref={ref}>
      <CFalseText
        text={typeof selectedValue === 'number' ? selectedValue.toString() : 'Selecione'}
        onClick={() => setIsTarget(!isTarget)}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
        }}
      >
        <AngleUpIcon color={'white-90'} toggle={!isTarget} onClick={() => setIsTarget(!isTarget)} />
      </div>
      {isTarget && (
        <div className={Style.SICOptions}>
          {Array.from({ length: range[1] - range[0] + 1 }, (_, i) => i + range[0]).map(
            (element) => {
              return (
                <div
                  key={`${element}`}
                  onClick={() => {
                    setCurrentSelected(element)
                    setIsTarget(false)
                  }}
                  className={Style.SICItem}
                >
                  <p className={Style.SICItemLabel}>
                    {padWithLeadingZeros(element, leadingZeros || element.toString().length)}
                  </p>
                </div>
              )
            },
          )}
        </div>
      )}
    </div>
  )
}

type SelectIntCardProps = Prettify<{
  SelectConfig: SelectConfig
  setCurrentSelected: React.Dispatch<number[]>
  defaultValue?: number[]
  currentSelected: number[]
}>

export const SelectIntCards: React.FC<SelectIntCardProps> = ({
  SelectConfig,
  setCurrentSelected,
  currentSelected,
  defaultValue,
}) => {
  return (
    <div className={Style.cardsWrapper}>
      <div className={Style.contentWrapper}>
        <select
          onChange={(e) => {
            setCurrentSelected([...currentSelected, Number(e.currentTarget.value)])
            e.currentTarget.value = '0'
          }}
          defaultValue={0}
        >
          <option value={0} disabled>
            Selecione
          </option>
          {SelectConfig.options
            .filter((element) => {
              if (currentSelected.includes(Number(element[SelectConfig.optionValueKey]))) {
                return false
              }
              return true
            })
            .map((element) => {
              return (
                <option
                  value={Number(element[SelectConfig.optionValueKey])}
                  key={`${element[SelectConfig.nameKey]}${element[SelectConfig.optionValueKey]}`}
                >
                  {element[SelectConfig.nameKey]}
                </option>
              )
            })}
        </select>
        <div className={Style.svgIcon}>
          <svg width='20px' height='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10 1L5 8h10l-5-7zm0 18l5-7H5l5 7z' />
          </svg>
        </div>
      </div>
      <div className={Style.selectedCards}>
        {currentSelected.map((element) => {
          const selectedElement = SelectConfig.options.find(
            (option) => Number(option[SelectConfig.optionValueKey]) === element,
          )
          if (!selectedElement) {
            return null
          }
          return (
            <div
              className={Style.selectedCard}
              key={`${selectedElement[SelectConfig.nameKey]}${
                selectedElement[SelectConfig.optionValueKey]
              }`}
            >
              <div className={Style.selectedCardName}>{selectedElement[SelectConfig.nameKey]}</div>
              <div
                className={Style.selectedCardRemove}
                onClick={() => {
                  setCurrentSelected(currentSelected.filter((id) => id !== element))
                }}
              >
                <svg
                  width='12px'
                  height='12px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z'
                    fill='#0F0F0F'
                  />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type SelectIntFromQueryProps = Prettify<{
  query: string
  setQuery: React.Dispatch<string>
  data:
    | {
        [key: string]: any
      }[]
    | undefined
  nameKey: string
  valueKey: string
  infoKey?: string
  setValue: (value: number) => void
  label: string
}>

export const SelectIntFromQuery: React.FC<SelectIntFromQueryProps> = ({
  query,
  setQuery,
  data,
  label,
  setValue,
  valueKey,
  nameKey,
  infoKey,
}) => {
  const { isTarget, ref, setIsTarget } = useTarget(false)
  return (
    <div className={Style.queryInputContainer} ref={ref}>
      <div className={Style.queryInputSearch}>
        <p>{label}</p>
        <input
          type='text'
          placeholder='Buscar por email...'
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onClick={() => setIsTarget(true)}
        />
      </div>
      {isTarget && (
        <div className={Style.queryResults}>
          {data &&
            data.length > 0 &&
            data.map((element) => {
              return (
                <div
                  key={element[valueKey]}
                  onClick={() => setValue(Number(element[valueKey]))}
                  className={Style.queryItem}
                >
                  <p className={Style.queryItemLabel}>{element[nameKey]}</p>
                  {infoKey && element[infoKey] && (
                    <p className={Style.queryItemInfo}>{element[infoKey]}</p>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
