import styled from 'styled-components'

export const Heading = styled.h2`
  font-size: 2rem;
  line-height: 1.38;
  margin: 0;
  text-align: center;
`

export const FoodDeliveryOptions = styled.div`
  display: flex;
  padding: 2rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 619px) {
    flex-direction: column;

    > * {
      margin: 1rem 0;
    }
  }
`

export const FooterDeliveryLink = styled.a`
  padding: 0 1rem;

  svg,
  img {
    width: auto;
    height: 3rem;
  }

  @media (min-width: 620px) {
    svg,
    img {
      height: 1.5rem;
    }
  }

  @media (min-width: 992px) {
    padding: 0 1.5rem;

    svg,
    img {
      height: 3.5rem;
    }
  }
`

export const FooterDeliveryLinkDeliverUberEats = styled(FooterDeliveryLink)`
  svg {
    height: 2.4rem;
  }

  @media (min-width: 620px) {
    svg {
      height: 1.5rem;
    }
  }

  @media (min-width: 992px) {
    svg {
      height: 2rem;
    }
  }
`

export const FooterDeliveryLinkDeliverEasy = styled(FooterDeliveryLink)`
  img {
    height: 4rem;
  }

  @media (min-width: 620px) {
    margin-top: -0.5rem;

    img {
      height: 2.5rem;
    }
  }

  @media (min-width: 992px) {
    margin-top: -0.8rem;

    img {
      height: 3.5rem;
    }
  }
`

export const FooterDeliveryLinkFoodNinja = styled(FooterDeliveryLink)`
  background: #e71d2f;
  padding: 1rem 1.5rem;

  @media (min-width: 620px) {
    padding: 0.8rem 1.5rem;
    margin: 0 1rem;

    img {
      height: 2.5rem;
    }
  }

  @media (min-width: 992px) {
    margin: 0 1.5rem;
    padding: 1rem 1.5rem;

    img {
      height: 3rem;
    }
  }
`
