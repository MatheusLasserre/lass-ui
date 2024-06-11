import { useEffect, useState } from 'react'
import useTarget from '../../../hooks/useTarget'
import {
  FormatNumberMask,
  NumberStringToNumber,
  padWithLeadingZeros,
} from '../../../utils/formating/numbers'
import { CFalseText, CText } from '../inputs/Inputs'
import { AngleUpIcon } from '../../assets/Icons'
import { clx } from '../../../utils/style'
import type { Prettify } from '../../../types/utils.d.ts'
import { usePseudoEl } from '../../../hooks/usePseudoEl'
import { CSS_VARS } from '../../../utils/cssVars'

type CurrencyInputProps = {
  currencyValue: number
  setCurrencyValue: (currencyValue: number) => void
  className?: string
  maxLength?: number
  placeholder?: string
  currencySymbol?: string
}

export const InputsTest: React.FC = () => {
  const [currencyValue, setCurrencyValue] = useState(0)
  return (
    <div>
      <CLCurrencyInput
        currencyValue={currencyValue}
        setCurrencyValue={setCurrencyValue}
        label='Label'
        currencySymbol='$'
      />
    </div>
  )
}

export const InputsTest2: React.FC = () => {
  const [currencyValue2, setCurrencyValue2] = useState(0)
  return (
    <div>
      <CurrencyInput
        currencyValue={currencyValue2}
        setCurrencyValue={setCurrencyValue2}
        currencySymbol='RR'
      />
    </div>
  )
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  className,
  currencyValue,
  setCurrencyValue,
  currencySymbol,
  maxLength,
  placeholder,
}) => {
  const [editValueString, setEditValueString] = useState(FormatNumberMask(currencyValue))
  const handleEditTransferAmountChange = (value: string) => {
    setCurrencyValue(NumberStringToNumber(value))
  }
  usePseudoEl('lassui-currencyBefore', [
    `.lassui-currencyBefore::after {content: "${currencySymbol}";display: inline;position: absolute;left: 10px;top: 16px;font-size: 16px;color: var(--white-100);font-weight: 500; text-align: right; width: 20px;}`,
    '.lassui-currencyBeforeInput {padding-left: 34px !important;}',
  ])

  useEffect(() => {
    setEditValueString(FormatNumberMask(currencyValue))
  }, [currencyValue])

  return (
    <div
      style={{
        position: 'relative',
      }}
      className='lassui-currencyBefore'
    >
      <CText
        value={editValueString}
        onChange={(e) => handleEditTransferAmountChange(e.currentTarget.value)}
        required
        type='text'
        name='value'
        id='value'
        placeholder={placeholder}
        maxLength={maxLength}
        className={clx(className, 'lassui-currencyBeforeInput')}
      />
    </div>
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
    <label
      className={clx(labelClassName)}
      style={{
        fontSize: '12px',
        fontWeight: '600',
        color: CSS_VARS['white-90'],
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
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

export const SelectIntCustom: React.FC<SelectIntProps> = ({
  SelectConfig,
  setCurrentSelected,
  defaultValue,
  selectedValue,
}) => {
  usePseudoEl('lassui-select-from-range', [
    '.lassui-SICItem:last-child {border-bottom: none;}',
    '.lassui-SICItem:hover {background-color: var(--neutral-100);}',
  ])
  const { isTarget, ref, setIsTarget } = useTarget(false)
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
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
        <AngleUpIcon
          color={'white-90'}
          toggle={!isTarget}
          onClick={() => setIsTarget(!isTarget)}
        />
      </div>
      {isTarget && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '0',
            width: '100%',
            backgroundColor: 'var(--neutral-100)',
            border: '1px solid var(--white-100)',
            borderRadius: '8px',
            zIndex: '999',
            maxHeight: '300px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {SelectConfig.options.map((element, index) => {
            return (
              <div
                key={`${element[SelectConfig.optionValueKey]}${index}`}
                onClick={() => {
                  setCurrentSelected(Number(element[SelectConfig.optionValueKey]))
                  setIsTarget(false)
                }}
                className='lassui-SICItem'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '8px',
                  cursor: 'pointer',
                  width: 'calc(100% + 50px)',
                  transition: 'background-color 0.05s ease-in-out',
                  borderBottom: '1px solid var(--white-100)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    margin: '0',
                    padding: '4px',
                    cursor: 'pointer',
                    color: 'var(--white-100)',
                  }}
                >
                  {element[SelectConfig.nameKey]}
                </p>
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
  usePseudoEl('lassui-select-from-range', [
    '.lassui-SICItem:last-child {border-bottom: none;}',
    '.lassui-SICItem:hover {background-color: var(--neutral-100);}',
  ])
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
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
        <AngleUpIcon
          color={'white-90'}
          toggle={!isTarget}
          onClick={() => setIsTarget(!isTarget)}
        />
      </div>
      {isTarget && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '0',
            width: '100%',
            backgroundColor: 'var(--neutral-100)',
            border: '1px solid var(--white-100)',
            borderRadius: '8px',
            zIndex: '999',
            maxHeight: '300px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {Array.from({ length: range[1] - range[0] + 1 }, (_, i) => i + range[0]).map(
            (element) => {
              return (
                <div
                  key={`${element}`}
                  onClick={() => {
                    setCurrentSelected(element)
                    setIsTarget(false)
                  }}
                  className='lassui-SICItem'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: '8px',
                    cursor: 'pointer',
                    width: 'calc(100% + 50px)',
                    transition: 'background-color 0.05s ease-in-out',
                    borderBottom: '1px solid var(--white-100)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      margin: '0',
                      padding: '4px',
                      cursor: 'pointer',
                      color: 'var(--white-100)',
                    }}
                  >
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
  usePseudoEl('lassui-select-int-from-query', [
    '.lassui-queryItem:hover{background-color: var(--primary-100);}',
  ])
  const { isTarget, ref, setIsTarget } = useTarget(false)
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0',
          }}
        >
          {label}
        </p>
        <input
          type='text'
          placeholder='Buscar por email...'
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onClick={() => setIsTarget(true)}
          style={{
            height: '30px',
            border: '1px solid var(--neutral-100)',
            backgroundColor: 'var(--white-100)',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
      </div>
      {isTarget && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '0',
            width: '100%',
            backgroundColor: 'var(--neutral-100)',
            border: '1px solid var(--white-100)',
            borderRadius: '8px',
            zIndex: '999',
            maxHeight: '300px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((element) => {
              return (
                <div
                  key={element[valueKey]}
                  onClick={() => setValue(Number(element[valueKey]))}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: '4px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      margin: '0',
                      padding: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {element[nameKey]}
                  </p>
                  {infoKey && element[infoKey] && (
                    <p
                      style={{
                        fontSize: '10px',
                        margin: '0',
                        padding: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {element[infoKey]}
                    </p>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
