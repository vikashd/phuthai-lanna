import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Facebook, UberEats, Message } from '../svg'
import {
  Address,
  BookingButton,
  BookingButtonContainer,
  Footer,
  FooterColumn,
  FooterColumnCenter,
  FooterContact,
  FoodDelivery,
  FooterDeliveryLink,
  FooterDeliveryLinkDeliverEasy,
  FoodDeliveryOptions,
  FooterIcon,
  Separator,
  Telephone,
} from './footer.style'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FooterComponent: React.FC<Props> = ({ onClick }) => {
  const footer = useRef<HTMLDivElement>(null)
  const tablet = useMediaQuery({ query: '(max-width: 1023px)' })
  const mobile = useMediaQuery({ query: '(max-width: 767px)' })
  const [stick, setSticky] = useState(false)
  const isTablet = useRef(tablet)
  const isMobile = useRef(mobile)

  const positionButton = () => {
    if (footer.current && isTablet.current) {
      const distance = isMobile.current ? 12 : 16

      setSticky(
        footer.current.offsetTop +
          distance -
          window.scrollY -
          window.innerHeight <
          0
      )
    }
  }

  const onScroll = () => positionButton()

  useEffect(() => {
    positionButton()
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    isTablet.current = tablet
    isMobile.current = mobile

    if (tablet) {
      positionButton()
    }
  }, [tablet, mobile, footer])

  return (
    <Footer ref={footer}>
      <BookingButtonContainer>
        <BookingButton onClick={onClick} stick={stick}>
          <Message />
          Make a reservation
        </BookingButton>
      </BookingButtonContainer>
      <FooterColumn>
        <FooterContact>
          <Address
            href="https://goo.gl/maps/aX32Pes12gpbofsu8"
            target="_blank"
            rel="noreferrer noopener"
          >
            Cnr Tory & Vivian St., Wellington
          </Address>
          <Separator />
          <Telephone href="tel:+6448017771">t: 04-801-7771</Telephone>
        </FooterContact>
      </FooterColumn>
      <FooterColumnCenter align="center">
        <FooterIcon
          as="a"
          href="https://www.facebook.com/phuthailanna1/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="PhuThai Lanna on Facebook"
        >
          <Facebook />
        </FooterIcon>
      </FooterColumnCenter>
      <FooterColumn align="flex-end">
        <FoodDelivery>
          <span>Partnered with</span>
          <FoodDeliveryOptions>
            <FooterDeliveryLink
              href="https://www.ubereats.com/nz/wellington/food-delivery/phuthai-lanna-restaurant/zdfiewasTKGis_qTnuDVrg"
              target="_blank"
              rel="noreferrer noopener"
              title="Uber Eats"
            >
              <UberEats />
            </FooterDeliveryLink>
            <FooterDeliveryLinkDeliverEasy
              href="https://www.delivereasy.co.nz/phu-thai-lanna-wellington-delivery"
              target="_blank"
              rel="noreferrer noopener"
              title="Deliver Easy"
            >
              <img src="../img/logo-deliver-easy.png" alt="Deliver Easy" />
            </FooterDeliveryLinkDeliverEasy>
            <FooterDeliveryLink
              href="https://www.foodninja.nz"
              target="_blank"
              rel="noreferrer noopener"
              title="Food Ninja"
            >
              <img src="../img/logo-food-ninja.png" alt="Food Ninja" />
            </FooterDeliveryLink>
          </FoodDeliveryOptions>
        </FoodDelivery>
      </FooterColumn>
    </Footer>
  )
}

export default FooterComponent
