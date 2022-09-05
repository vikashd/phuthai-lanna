import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
`

export const Heading = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 0.4rem -0.2rem;

  @media (min-width: 321px) {
    font-size: 3.5rem;
  }

  @media (min-width: 768px) {
    font-size: 6rem;
  }
`

export const SubHeading = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
`

export const FoodMenuHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 0 2rem;
  padding-top: 2rem;
  border-top: 2px solid #a2996d;

  @media (min-width: 580px) {
    font-size: 3rem;
    padding-top: 1rem;
  }
`

export const FoodItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;

  > * {
    flex: 0 1 50%;
    padding: 0 1rem;
  }

  @media (min-width: 768px) {
    > * {
      flex: 0 1 33.3333%;
    }
  }

  @media (min-width: 992px) {
    > * {
      flex: 0 1 25%;
    }
  }
`

// export const Img = styled.img`
//   display: block;
//   border: 1rem solid #a2996d;
//   border-left: none;
//   max-width: 100%;
//   margin: 2rem 0 2rem -3rem;
// `

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 2rem);
  min-height: 600px;

  @media (min-width: 1024px) {
    min-height: calc(100vh - 8rem);
  }
`

export const Intro = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rem solid #a2996d;
  background: url(/img/food-sm.jpg) no-repeat center;
  background-size: cover;
  max-width: 1400px;
  width: 100%;
  height: 65vh;
  margin: 4rem auto;

  svg {
    position: absolute;
    width: auto;
    height: 9rem;
    fill: #a2996d;
    left: -2.2rem;
    bottom: -2rem;
  }

  @media (min-width: 768px) {
    background: url(/img/food.jpg) no-repeat center;
    background-size: cover;
  }
`

export const IntroContent = styled.div``

export const IntroText = styled.div`
  font-family: 'Roboto Mono', monospace;
  line-height: 1.8;
  display: flex;
  color: white;
  background: rgba(162, 153, 109, 0.8);
  margin: 1rem;
  padding: 2rem;
  flex-direction: column;
  text-align: center;

  > p {
    margin: 0 0 0.5rem;

    &:first-child {
      @media (max-width: 579px) {
        // display: flex;
        // flex-direction: column;
      }
    }

    &:last-child {
      margin: 0;
    }
  }

  @media (max-width: 579px) {
    width: 100%;
  }

  @media (min-width: 768px) {
    line-height: 1.5;
  }
`

export const Container = styled.div`
  background-color: white;
  padding: 1rem;

  @media (min-width: 1024px) {
    padding-bottom: 10rem;
  }
`

export const PromotionContainer = styled.div`
  display: flex;
  margin: 2.5rem 0 3.5rem;
  justify-content: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    margin: 2.5rem 0 1rem;
  }
`

export const Promotion = styled.div`
  display: block;
  max-width: 400px;
  border: 1rem solid #7d7655;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const PromotionContent = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  max-width: 400px;

  p {
    font-size: 1.35rem;
    line-height: 1.4;
    margin: 0 0 1rem;

    &:last-child {
      margin: 0;
    }
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    flex: 0 1 400px;
  }
`

export const PromotionTerms = styled.ul`
  font-size: 1.2rem;

  > li {
    margin-bottom: 0.5rem;
  }
`

export const HeaderBar = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 1rem;
  z-index: 1;
  transform: translate3d(0, -100%, 0);
  transition: transform 0.3s ease-out;

  &.active {
    transform: translate3d(0, 0, 0);
  }

  svg {
    width: auto;
    height: 4rem;
    fill: #a2996d;
  }
`

export const PhoneLink = styled.a`
  display: inline-flex;
  color: inherit;
  align-items: center;
  text-decoration: none;

  svg {
    display: block;
    margin-right: 0.5rem;
  }

  @media (max-width: 767px) {
    svg {
      width: auto;
      height: 2rem;
      margin-right: 0;
    }

    span {
      display: none;
    }
  }
`
