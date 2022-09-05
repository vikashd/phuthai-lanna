import styled from 'styled-components'

export const Footer = styled.div`
  position: relative;
  display: flex;
  font-size: 1.3rem;
  background: #a2996d;
  padding: 1.8rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  @media (max-width: 1023px) {
    flex-direction: column;
    margin-top: 8rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
`

export const FooterColumn = styled.div<{
  align?: 'flex-start' | 'flex-end' | 'center' | ''
}>`
  display: flex;
  flex: 1 1 33.3333%;
  justify-content: ${(props) => props.align || 'flex-start'};

  @media (max-width: 579px) {
    flex-direction: column;
  }

  @media (max-width: 1023px) {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`

export const FooterColumnCenter = styled(FooterColumn)`
  flex: 0 1 15%;
`

export const FooterIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: 2px solid;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  transition: color 0.2s ease-out;

  svg {
    width: auto;
    height: 1rem;
    fill: currentColor;
  }

  &:active,
  &:hover {
    color: #7d7655;
    transition: none;
  }
`

export const FoodDelivery = styled.div`
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    span {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    span {
      margin-right: 0.6rem;

      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 2rem;
        background: black;
        margin-left: 1rem;
      }
    }
  }
`

export const FoodDeliveryOptions = styled.div`
  display: flex;

  > * {
    margin: 0 0.6rem;
  }

  @media (max-width: 579px) {
    flex-direction: column;
    align-items: center;

    > * {
      margin-bottom: 0.8rem;
    }
  }
`

export const FooterDeliveryLink = styled.a`
  img,
  svg {
    width: auto;
    height: 3rem;
  }

  @media (min-width: 768px) {
    img,
    svg {
      width: auto;
      height: 1.5rem;
    }
  }

  @media (min-width: 1200px) {
    img,
    svg {
      height: 2rem;
    }
  }
`

export const FooterDeliveryLinkDeliverEasy = styled(FooterDeliveryLink)`
  margin-top: -0.2rem;

  @media (max-width: 767px) {
    img {
      height: 2.8rem;
    }
  }
`

export const BookingButtonContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
`

export const BookingButton = styled.button<{ stick?: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  border-radius: 1.5rem;
  line-height: 1;
  background: #a2996d;
  border: none;
  padding: 0.8rem 1.5rem 0.9rem;
  bottom: 1.5rem;
  outline: none;
  cursor: pointer;
  transition: color 0.2s ease-out, background 0.2s ease-out;

  svg {
    position: relative;
    top: 0.1rem;
    width: auto;
    height: 1.1rem;
    fill: currentColor;
    margin-right: 0.4rem;
  }

  &:active,
  &:hover {
    color: #a2996d;
    background: black;
    transition: none;
  }

  ${(props) => {
    if (props.stick) {
      return `
        position: absolute;
        bottom: 0.5rem;

        @media (min-width: 768px) {
          bottom: 0.5rem;
        }
      `
    }
  }}

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 2rem 0.6rem;
    border-radius: 1.1rem;
  }

  @media (min-width: 1024px) {
    position: absolute;
    bottom: 0.5rem;
  }
`

export const FooterContact = styled.div`
  @media (max-width: 579px) {
    display: flex;
    flex-direction: column;
    line-height: 1.4em;
  }
`

export const Separator = styled.div`
  display: inline-block;
  margin: 0 0.5rem;

  @media (max-width: 579px) {
    &:after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: black;
      border-radius: 50%;
      margin: 0.5rem auto 0.3rem;
    }
  }

  @media (min-width: 580px) {
    &:after {
      content: '/';
    }
  }
`

export const Address = styled.a`
  color: inherit;
  text-decoration: none;

  @media (max-width: 767px) {
    display: inline-block;
  }
`

export const Telephone = styled.a`
  color: inherit;
  text-decoration: none;

  @media (max-width: 767px) {
    display: inline-block;
  }
`
