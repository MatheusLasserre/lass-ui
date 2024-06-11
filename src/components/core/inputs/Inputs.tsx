import { ClassAttributes, forwardRef, InputHTMLAttributes, useState } from 'react'
import { CrossIcon, EyeIcon } from '../../assets/Icons'
import { FlexRow, HideComponent } from '../containers/Utils'
import useTarget from '../../../hooks/useTarget'
import { Text } from '../text/Text'
import { CSS_VARS, CSS_VARS_OPTIONS } from '../../../utils/cssVars'
import { clx } from '../../../utils/style'
import { usePseudoEl } from '../../../hooks/usePseudoEl'

type InputProps = {
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder']
  required?: InputHTMLAttributes<HTMLInputElement>['required']
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  id?: InputHTMLAttributes<HTMLInputElement>['id']
  name?: string
  className?: string
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>['onKeyDown']
  ref?: ClassAttributes<HTMLInputElement>['ref']
  disabled?: boolean
}

export const CLabel: React.FC<{
  label: string
  className?: string
  children?: React.ReactNode
}> = ({ label, className, children }) => {
  return (
    <label
      className={className}
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
      {children}
    </label>
  )
}

export const CText: React.ForwardRefExoticComponent<
  Omit<InputProps, 'ref'> & React.RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      onChange,
      placeholder,
      required,
      value,
      className,
      maxLength,
      name,
      id,
      disabled,
      onKeyDown,
    },
    ref,
  ) => {
    if (type === 'password')
      return (
        <CPassword
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
          className={className}
          maxLength={maxLength}
          name={name}
          id={id}
          onKeyDown={onKeyDown}
          ref={ref}
          disabled={disabled}
        />
      )

    usePseudoEl('lassui-CText', [
      `.lassui-CText::placeholder {color: ${CSS_VARS['white-30']};}`,
      `.lassui-CText:focus {outline: 1px solid ${CSS_VARS['secondary-orange-200']};outline-offset: -1px;margin: auto;}`,
      `.lassui-CText:disabled {background-color: ${CSS_VARS['neutral-300']};color: ${CSS_VARS['neutral-500']};cursor: not-allowed;}`,
    ])

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        className={'lassui-CText' + ' ' + className}
        id={id}
        onKeyDown={onKeyDown}
        ref={ref}
        disabled={disabled}
        style={{
          width: '100%',
          paddingLeft: '30px',
          paddingRight: '30px',
          height: '50px',
          borderRadius: '8px',
          borderStyle: 'none',
          backgroundColor: CSS_VARS['neutral-500'],
          fontSize: '18px',
          fontWeight: '500',
          color: CSS_VARS['white-90'],
          margin: 'auto',
        }}
      />
    )
  },
)

export const CPassword: React.ForwardRefExoticComponent<
  Omit<InputProps, 'ref'> & React.RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, onChange, placeholder, required, value, className, maxLength, name, id, onKeyDown },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    usePseudoEl('lassui-CText', [
      `.lassui-CText::placeholder {color: ${CSS_VARS['white-30']};}`,
      `.lassui-CText:focus {outline: 1px solid ${CSS_VARS['secondary-orange-200']};outline-offset: -1px;margin: auto;}`,
      `.lassui-CText:disabled {background-color: ${CSS_VARS['neutral-300']};color: ${CSS_VARS['neutral-500']};cursor: not-allowed;}`,
    ])
    return (
      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          name={name}
          id={id}
          className={'lassui-CText' + ' ' + className}
          style={{
            width: '100%',
            paddingLeft: '30px',
            paddingRight: '30px',
            height: '50px',
            borderRadius: '8px',
            borderStyle: 'none',
            backgroundColor: CSS_VARS['neutral-500'],
            fontSize: '18px',
            fontWeight: '500',
            color: CSS_VARS['white-90'],
            margin: 'auto',
          }}
        />
        <EyeIcon showPassword={showPassword} setShowPassword={setShowPassword} />
      </div>
    )
  },
)

export const CLText: React.FC<
  InputProps & {
    label: string
    labelClassName?: string
  }
> = ({
  type,
  onChange,
  placeholder,
  required,
  value,
  maxLength,
  className,
  label,
  labelClassName,
  name,
  id,
  disabled,
  onKeyDown,
}) => {
  return (
    <CLabel label={label} className={labelClassName}>
      {label}
      <CText
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        id={id}
        className={className}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
    </CLabel>
  )
}

export const CCheckbox: React.FC<{
  checked: boolean
  setChecked: React.Dispatch<boolean>
  checkBoxClassName?: string
}> = ({ checked, setChecked, checkBoxClassName }) => {
  usePseudoEl('lassui-CLCheckbox', [
    '.lassui-CLCheckbox > svg {display: none;}',
    `.lassui-CLCheckbox[data-checked="true"] {background-color: ${CSS_VARS['primary-500']};border: none;border-radius: 4px;width: 16px;height: 16px;display: flex;align-items: center;justify-content: center;}`,
    '.lassui-CLCheckbox[data-checked="true"] > svg {display: block;}',
  ])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <div
        onClick={() => setChecked(!checked)}
        className={clx(
          'lassui-CLCheckbox',
          checkBoxClassName,
          `${checked ? 'data-checked="true"' : ''}`,
        )}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '8px',
          marginBottom: '8px',
          borderRadius: '4px',
          width: '16px',
          height: '16px',
          border: `1px solid ${CSS_VARS['white-90']}`,
          cursor: 'pointer',
        }}
        data-checked={checked}
      >
        <svg width='9' height='6' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.65741 7.00019C4.56141 7.00019 4.46541 6.96344 4.39191 6.89069L1.39191 3.89069C1.24566 3.74369 1.24566 3.50669 1.39191 3.35969C1.53891 3.21344 1.77591 3.21344 1.92291 3.35969L4.65741 6.09494L9.64191 1.10969C9.78891 0.963438 10.0259 0.963438 10.1729 1.10969C10.3192 1.25669 10.3192 1.49369 10.1729 1.64069L4.92291 6.89069C4.84941 6.96344 4.75341 7.00019 4.65741 7.00019Z'
            fill='white'
            stroke='white'
          />
        </svg>
      </div>
    </div>
  )
}

export const CLCheckbox: React.FC<{
  checked: boolean
  setChecked: React.Dispatch<boolean>
  label: string
  labelClassName?: string
  checkBoxClassName?: string
}> = ({ checked, setChecked, label, labelClassName, checkBoxClassName }) => {
  usePseudoEl('lassui-CLCheckbox', [
    '.lassui-CLCheckbox > svg {display: none;}',
    `.lassui-CLCheckbox[data-checked="true"] {background-color: ${CSS_VARS['primary-500']};border: none;border-radius: 4px;width: 16px;height: 16px;display: flex;align-items: center;justify-content: center;}`,
    '.lassui-CLCheckbox[data-checked="true"] > svg {display: block;}',
  ])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <div
        onClick={() => setChecked(!checked)}
        className={clx(
          'lassui-CLCheckbox',
          checkBoxClassName,
          `${checked ? 'data-checked="true"' : ''}`,
        )}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '8px',
          marginBottom: '8px',
          borderRadius: '4px',
          width: '16px',
          height: '16px',
          border: `1px solid ${CSS_VARS['white-90']}`,
          cursor: 'pointer',
        }}
        data-checked={checked}
      >
        <svg width='9' height='6' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.65741 7.00019C4.56141 7.00019 4.46541 6.96344 4.39191 6.89069L1.39191 3.89069C1.24566 3.74369 1.24566 3.50669 1.39191 3.35969C1.53891 3.21344 1.77591 3.21344 1.92291 3.35969L4.65741 6.09494L9.64191 1.10969C9.78891 0.963438 10.0259 0.963438 10.1729 1.10969C10.3192 1.25669 10.3192 1.49369 10.1729 1.64069L4.92291 6.89069C4.84941 6.96344 4.75341 7.00019 4.65741 7.00019Z'
            fill='white'
            stroke='white'
          />
        </svg>
      </div>
      <label
        className={labelClassName}
        style={{
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: '400',
          color: CSS_VARS['white-90'],
        }}
      >
        {label}
      </label>
    </div>
  )
}

export const CRadio: React.FC<{
  selected: boolean
  setSelected: () => void
  className?: string
}> = ({ selected, setSelected, className }) => {
  usePseudoEl('lassui-CRadio', [
    `.lassui-Cradio[type="radio"] {appearance: none;-webkit-appearance: none;background-color: #fff;font: inherit;width: 1.6rem;height: 1.6rem;border: 0.15rem solid ${CSS_VARS['white-90']};border-radius: 50%;cursor: pointer;margin: 0;display: grid;place-content: center;transition: 500ms transform ease-in-out;}`,
    '.lassui-Cradio[type="radio"]::before {content: "";width: 0.6rem;height: 0.6rem;border-radius: 50%;transform: scale(0);transition: 240ms transform ease-in-out;box-shadow: inset 0.6rem 0.6rem #fff;cursor: pointer;}',
    '.lassui-Cradio[type="radio"]:checked::before {transform: scale(1);}',
    `.lassui-Cradio[type="radio"]:checked {background-color: ${CSS_VARS['primary-500']};border: 0.15rem solid ${CSS_VARS['white-90']};}`,
  ])
  return (
    <input
      type='radio'
      checked={selected}
      onChange={(e) => setSelected()}
      className={clx('lassui-Cradio', className)}
    />
  )
}

type TextFilterProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  placeholder?: string
  className?: string
} & InputProps
export const CTextFilter: React.FC<TextFilterProps> = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  id,
  maxLength,
  name,
  onKeyDown,
  required,
  type,
  onClear,
}) => {
  usePseudoEl('lassui-CTextFilter', [
    '.lassui-textFilter>svg {position: absolute;right: 8px;top: 13px;cursor: pointer;}',
  ])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
      className='lassui-textFilter'
    >
      <CText
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        onKeyDown={onKeyDown}
        required={required}
      />
      <CrossIcon onClick={() => onClear()} width={24} />
    </div>
  )
}

type FalseTextProps = {
  text: string
  className?: string
  onClick?: () => void
}

export const CFalseText: React.FC<FalseTextProps> = ({ text, className, onClick }) => {
  return (
    <p
      style={{
        cursor: onClick ? 'pointer' : 'default',
        widows: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '8px',
        margin: 'auto',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: CSS_VARS['neutral-500'],
        color: CSS_VARS['white-90'],
      }}
      onClick={onClick}
      className={clx(className)}
    >
      {text}
    </p>
  )
}
