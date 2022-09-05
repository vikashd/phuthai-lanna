import getDay from 'date-fns/getDay'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import { Close, Error as IconError, Message, Phone } from '../svg'
import {
  CloseButton,
  CustomInput,
  DatePickerWrapper,
  Error,
  Form,
  FormCloseButton,
  FormContainer,
  FormContainerContent,
  FormContentWrapper,
  FormContent,
  Input,
  Label,
  LoaderOverlay,
  Radio,
  RadioOptions,
  SideButton,
  SideButtons,
  Submit,
  TextArea,
} from './form.style'
import Loader from './loader'

type ContactTypes = 'booking' | 'contact'

export interface FormData {
  contactType: ContactTypes
  name: string
  email: string
  date: Date
  people: number
  phone: string
  message: string
}

export interface FormStatus {
  type: 'open' | 'close' | 'loading' | 'closed' | 'sent' | 'error'
  message?: string
}

interface Props {
  onSubmit: (data: FormData) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  status?: FormStatus
  open?: boolean
  ref?: any
}

const setTimes = (hours: Array<number>) =>
  hours.reduce<Array<any>>(
    (acc, hour) => [...acc, ...[0, 15, 30, 45].map((minute) => [hour, minute])],
    []
  )

const times = [
  [17, 0],
  [17, 15],
  [17, 30],
  [17, 45],
  ...setTimes([18, 19, 20]),
  [21, 0],
  [21, 15],
  [21, 30],
].map(([hour, minutes]) => {
  const date = new Date()
  return date.setHours(hour, minutes)
})

const isNotTuesday = (date) => {
  const day = getDay(date)
  return day !== 2
}

const ContactForm: React.FC<Props> = ({ onSubmit, onClick, open, status }) => {
  const { control, errors, register, watch, handleSubmit, reset } = useForm<
    FormData
  >()
  const [selected, setSelected] = useState<ContactTypes>('booking')
  const watchContactType = watch('contactType', 'booking')

  const resetForm = (form?: ContactTypes) => {
    reset({ contactType: form, date: undefined })
  }

  const submit = (data: FormData) => {
    onSubmit(data)
  }

  useEffect(() => {
    if (status?.type === 'closed') {
      resetForm(selected)
    }
  }, [status?.type])

  useEffect(() => {
    resetForm(selected)
  }, [selected])

  const loading = status?.type === 'loading'
  const submitError = status?.type === 'error'
  const sent = status?.type === 'sent'
  const tabIndex = open && !loading && !sent ? 0 : -1
  const hasErrors = Boolean(Object.keys(errors).length) || submitError
  const errorMessage =
    status?.message ||
    errors.email?.message ||
    errors.date?.message ||
    'Please update the fields highlighted below'

  return (
    <FormContainer>
      <CloseButton type="button" onClick={onClick} tabIndex={tabIndex}>
        <Close />
      </CloseButton>
      <SideButtons>
        <FormCloseButton
          type="button"
          as="button"
          onClick={onClick}
          open={open}
          aria-label={open ? 'Close contact form' : 'Open contact form'}
        >
          {open ? <Close /> : <Message />}
        </FormCloseButton>
        <SideButton href="tel:+6448017771">
          <Phone />
        </SideButton>
      </SideButtons>
      <FormContainerContent>
        <CSSTransition in={sent} classNames="sent" timeout={400}>
          <FormContentWrapper>
            <FormContent>
              <Form onSubmit={handleSubmit(submit)}>
                <RadioOptions>
                  <Radio
                    htmlFor="booking"
                    className={watchContactType === 'booking' ? 'selected' : ''}
                    onChange={() => setSelected('booking')}
                  >
                    <input
                      id="booking"
                      type="radio"
                      name="contactType"
                      value="booking"
                      defaultChecked
                      ref={register}
                    />
                    <span>Make a reservation</span>
                  </Radio>
                  <Radio
                    htmlFor="contact"
                    className={watchContactType === 'contact' ? 'selected' : ''}
                    onChange={() => setSelected('contact')}
                  >
                    <input
                      id="contact"
                      type="radio"
                      name="contactType"
                      value="contact"
                      ref={register}
                    />
                    <span>Contact/enquiry</span>
                  </Radio>
                </RadioOptions>
                {hasErrors && (
                  <Error>
                    <IconError />
                    {errorMessage}
                  </Error>
                )}
                <Label htmlFor="name" required={true}>
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  ref={register({ required: true })}
                  tabIndex={tabIndex}
                  error={errors.hasOwnProperty('name')}
                />
                <Label htmlFor="email" required={true}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  ref={register({
                    required: true,
                    validate: (email) =>
                      !!email.match(
                        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                      )
                        ? true
                        : 'Enter a valid email',
                  })}
                  tabIndex={tabIndex}
                  error={errors.hasOwnProperty('email')}
                />
                {watchContactType === 'booking' && (
                  <>
                    <Label htmlFor="telephone">Phone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      name="telephone"
                      ref={register}
                    />
                    <Label required={true}>Date</Label>
                    <DatePickerWrapper>
                      <Controller
                        as={
                          <DatePicker
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="iii d MMMM, h:mm aa"
                            minDate={new Date()}
                            filterDate={isNotTuesday}
                            includeTimes={times}
                            tabIndex={tabIndex}
                            customInput={
                              <CustomInput
                                error={errors.hasOwnProperty('date')}
                              />
                            }
                          />
                        }
                        name="date"
                        control={control}
                        valueName="selected"
                        onChange={([selected]) => selected}
                        rules={{
                          required: true,
                          validate: (date) => {
                            const startDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              17,
                              0
                            )
                            const endDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                              21,
                              30
                            )

                            return !(
                              isBefore(date, startDate) ||
                              isAfter(date, endDate)
                            )
                              ? true
                              : 'Enter a valid time'
                          },
                        }}
                        defaultValue=""
                      />
                    </DatePickerWrapper>
                    <Label htmlFor="people" required={true}>
                      Number of people
                    </Label>
                    <Input
                      id="people"
                      type="number"
                      name="people"
                      error={errors.hasOwnProperty('people')}
                      ref={register({ required: true })}
                    />
                  </>
                )}
                <Label
                  htmlFor="message"
                  required={watchContactType === 'contact'}
                >
                  Message
                </Label>
                <TextArea
                  id="message"
                  name="message"
                  ref={register({
                    required: watchContactType === 'contact',
                    maxLength: 200,
                  })}
                  error={errors.hasOwnProperty('message')}
                  tabIndex={tabIndex}
                />
                <Submit type="submit" tabIndex={tabIndex}>
                  {watchContactType === 'contact' ? 'Send' : 'Book'}
                </Submit>
              </Form>
            </FormContent>
            <FormContent>
              <p>Thanks for getting in touch!</p>
              <p>
                You should receive an email to confirm we've received your
                message within the next few minutes.
              </p>
              <p>
                If you don't see this check your spam folder or give us a call.
              </p>
            </FormContent>
          </FormContentWrapper>
        </CSSTransition>
      </FormContainerContent>
      {loading && (
        <LoaderOverlay>
          <Loader />
        </LoaderOverlay>
      )}
    </FormContainer>
  )
}

export default ContactForm
