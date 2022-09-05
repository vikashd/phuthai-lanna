import React from 'react'
import styled, { StyledComponent } from 'styled-components'

export const FormContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background: white;
  border: 1rem solid #a2996d;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 19px 5px rgba(0, 0, 0, 0.4);
  transform: translate3d(100%, 0, 0);
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.24, -0.01, 0.42, 1.01);

  &.contact-form-enter-active,
  &.contact-form-enter-done {
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: 768px) {
    max-width: 700px;
  }
`

export const FormContainerContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const FormContentWrapper = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.24, -0.01, 0.42, 1.01);

  > * {
    width: 50%;
  }

  &.sent-enter-active,
  &.sent-enter-done {
    transform: translate3d(-50%, 0, 0);
  }
`

export const FormContent = styled.div`
  padding: 1rem;
  padding-top: 4rem;
  height: 100%;
  overflow-y: auto;

  p {
    font-size: 1.4rem;
    margin: 0 0 1.5rem;
    line-height: 1.5;
  }

  @media (min-width: 768px) {
    padding: 4rem 2rem 2rem;

    p {
      font-size: 1.1rem;
    }
  }
`

export const Form = styled.form.attrs({
  noValidate: true,
})`
  padding-bottom: 2rem;
`

export const Error = styled.div`
  display: flex;
  font-family: 'Roboto Mono', monospace;
  color: white;
  background: #a23707;
  padding: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  svg {
    position: relative;
    top: -0.1rem;
    margin-right: 0.65rem;
    fill: currentColor;
  }

  @media (min-width: 768px) {
    svg {
      top: 0.15rem;
    }
  }
`

export const LoaderOverlay = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: rgba(162, 153, 109, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Label = styled.label<{ required?: boolean }>`
  display: block;
  font-family: 'Roboto Mono', monospace;
  margin: 0 0 0.5rem;

  ${(props) => {
    if (props.required) {
      return `
        &::after {
          content: "*";
          color: #7d7655;
        }
      `
    }
  }}
`

export const Input = styled.input<{ error?: boolean }>`
  font-family: 'Roboto Mono', monospace;
  width: 100%;
  padding: 1rem 0.6rem;
  margin: 0 0 1rem;
  border: 1px solid #a2996d;

  &:focus {
    outline: none;
  }

  ${(props) => {
    if (props.error) {
      return `
        border-color: #a23707;
        box-shadow: 0 0 0px 1px #a23707;
      `
    }
  }}

  @media (min-width: 768px) {
    padding: 0.8rem 0.6rem;
  }
`

export const DatePickerComponent = styled.button.attrs({
  type: 'button',
})`
  font-family: 'Roboto Mono', monospace;
  width: 100%;
  padding: 1rem 0.6rem;
  margin: 0 0 1rem;
  border: 1px solid #a2996d;
  background: white;
  text-align: left;

  &:focus {
    outline: none;
  }

  > span {
    display: inline-block;
  }

  ${(props) => {
    // @ts-ignore
    if (props.error) {
      return `
        border-color: #a23707;
        box-shadow: 0 0 0px 1px #a23707;
      `
    }
  }}

  @media (min-width: 768px) {
    padding: 0.8rem 0.6rem;
  }
`

export const CustomInput = React.forwardRef(function Custom(
  {
    value,
    onClick,
    error,
  }: {
    value?: string
    onClick?(
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>
    ): void
    error?: boolean
  },
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <DatePickerComponent
      ref={ref}
      onClick={onClick}
      onFocus={onClick}
      // @ts-ignore
      error={error}
      aria-label="Date and time picker"
    >
      {value ? value : <span />}
    </DatePickerComponent>
  )
})

export const RadioOptions = styled.div`
  display: flex;
  margin: 0 0 2rem;

  > * {
    flex: 1 1 50%;
    transition: all 0.2s ease-out;

    &.selected {
      flex: 1 1 75%;
      width: 75%;
    }
  }
`

export const Radio = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;

  span {
    position: relative;
    display: block;
    background: #a2996d;
    padding: 1rem 1rem 1.1rem;
    text-align: center;
    border-top-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    white-space: nowrap;
    transition: background 0.2s ease-out;

    &:before,
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 1rem;
      height: 1rem;
      top: 100%;
      left: 0;
      background: #7d7655;
      transition: all 0.2s ease-out;
    }

    &:after {
      background: white;
      width: 1.1rem;
    }
  }

  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);

    &:checked {
      + span {
        color: white;
        background: #7d7655;

        &:after {
          border-top-left-radius: 1rem;
        }
      }
    }
  }

  &:hover {
    span {
      color: white;
      background: #7d7655;
      transition: none;
    }
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

export const TextArea = styled(Input).attrs({ as: 'textarea' })`
  height: 4rem;
  resize: none;
`

export const DatePickerWrapper = styled.div`
  position: relative;

  .react-datepicker-popper {
    width: 100%;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  top: 0;
  right: 0;
  border: none;
  background: none;
  color: #a2996d;
  width: 4rem;
  height: 4rem;
  outline: none;
  cursor: pointer;
  z-index: 1;

  svg {
    display: block;
    width: auto;
    height: 1.5rem;
    fill: currentColor;
    transition: transform 0.15s ease-out;
  }

  &:hover {
    svg {
      transform: scale(0.75);
    }
  }

  @media (min-width: 768px) {
    display: none;
    width: 3.25rem;
    height: 3.25rem;
  }
`

export const SideButtons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  margin-right: 0.99rem;
  margin-top: 3rem;
  right: 100%;
  box-shadow: -9px 0px 12px -4px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    margin-top: 4rem;
  }

  > * {
    margin-bottom: 1px;
  }
`

export const SideButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  color: white;
  background: #a2996d;
  padding: 0;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background 0.2s ease-out;

  svg {
    display: block;
    width: auto;
    height: 1.5rem;
    fill: currentColor;
    transition: transform 0.15s ease-out;
  }

  &:focus,
  &:hover {
    background: #7d7655;
    transition: none;

    svg {
      transform: scale(0.75);
    }
  }

  @media (min-width: 768px) {
    width: 3.25rem;
    height: 3.25rem;
  }
`

export const FormCloseButton = styled<
  StyledComponent<'a', {}, { open?: boolean }>
>(SideButton).attrs({ as: 'button' })`
  ${(props) => {
    if (!props.open) {
      return `
        svg {
          width: auto;
          height: 2rem;
        }

        @media (min-width: 768px) {
          svg {
            height: 1.5rem;
          }
        }
      `
    }
  }}
`

export const Submit = styled.button`
  font-family: 'Roboto Mono', monospace;
  color: white;
  border: none;
  padding: 1rem;
  background: #a2996d;
  width: 100%;
  outline: none;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #a2996d;
    background: white;
    box-shadow: 0 0 1px 1px #a2996d inset;
  }
`
