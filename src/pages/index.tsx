import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import { GetStaticProps, NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { sendMessage } from '../api'
import getDishes from '../api/get-dishes'
import ContactForm, { FormData, FormStatus } from '../components/contact-form'
import Delivery from '../components/delivery'
import FoodItem, { Dish } from '../components/food-item'
import Footer from '../components/footer'
import {
  Container,
  FoodItems,
  FoodMenuHeading,
  Header,
  HeaderBar,
  Heading,
  Intro,
  IntroContainer,
  IntroContent,
  IntroText,
  Promotion,
  PromotionContainer,
  PromotionContent,
  PromotionTerms,
  SubHeading,
} from '../components/page.style'
import { FIREBASE_CONFIG } from '../config'
import { Lanna } from '../svg'

interface Menu {
  id: string
  name: string
  items: Array<Dish>
}

interface Props {
  menu: Array<Menu>
}

const Home: NextPage<Props> = ({ menu }) => {
  const [show, showForm] = useState(false)
  const [header, showHeader] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>()
  const db = useRef<firebase.firestore.Firestore>()
  const promotionImage = useRef(
    `/img/promotion-birthday-0${Math.round(Math.random() * 2) + 1}.jpg`
  )

  const onSubmit = (data: FormData) => {
    if (db.current) {
      setFormStatus({ type: 'loading' })

      sendMessage(db.current, data).subscribe({
        complete: () => {
          setFormStatus({ type: 'sent' })
        },
        error: () => {
          setFormStatus({
            type: 'error',
            message: 'An error occurred trying to submit your message',
          })
        },
      })
    }
  }

  const openForm = () => {
    showForm(true)
  }

  const closeForm = () => {
    showForm(false)
  }

  const toggleForm = () => {
    if (!show) {
      Router.push('/?contact', '/contact', { shallow: true })
    } else {
      Router.push('/', '/', { shallow: true })
    }
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG)
    }

    firebase.analytics()
    db.current = firebase.firestore()

    const handleRouteChange = (url) => {
      if (url === '/contact') {
        openForm()
      } else {
        closeForm()
      }
    }

    Router.events.on('routeChangeStart', handleRouteChange)

    if (Router.asPath === '/contact') {
      openForm()
    }

    window.addEventListener('scroll', () => {
      showHeader(window.scrollY > 300)
    })

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <Container>
      <IntroContainer>
        <HeaderBar className={header ? 'active' : ''}>
          <Lanna />
        </HeaderBar>
        <Header>
          <Heading>PhuThai Lanna</Heading>
        </Header>
        <SubHeading>Cnr Tory & Vivian St., Wellington</SubHeading>
        <IntroContent>
          <Intro>
            <IntroText>
              <p>
                Mon - Sun <span> • </span>5pm - Late
              </p>
              <p>(Closed Tuesday's)</p>
            </IntroText>
            <Lanna />
          </Intro>
        </IntroContent>
      </IntroContainer>

      <PromotionContainer>
        <Promotion>
          <img src={promotionImage.current} alt="Birthday promotion" />
        </Promotion>
        <PromotionContent>
          <div>
            <p>
              <strong>
                Birthday special: A free main for the fabulous birthday host!
              </strong>
            </p>
            <p>
              <PromotionTerms>
                <li>Monday, Wednesday & Thursday</li>
                <li>Non-seafood</li>
                <li>
                  Not to be used in conjunction with any other
                  offers/extras/sides
                </li>
              </PromotionTerms>
            </p>
          </div>
        </PromotionContent>
      </PromotionContainer>

      <Delivery />

      {menu.map(({ name: heading, items }, i) => {
        return (
          <div key={i}>
            <FoodMenuHeading>{heading}</FoodMenuHeading>
            <FoodItems>
              {items.map(({ name, description, price }, j) => (
                <FoodItem
                  key={j}
                  name={name}
                  description={description}
                  price={price}
                />
              ))}
            </FoodItems>
          </div>
        )
      })}

      <CSSTransition
        in={show}
        classNames="contact-form"
        onExited={() => setFormStatus({ type: 'closed' })}
        timeout={400}
      >
        <ContactForm
          onSubmit={onSubmit}
          onClick={toggleForm}
          open={show}
          status={formStatus}
        />
      </CSSTransition>
      <Footer
        onClick={() => Router.push('/?contact', '/contact', { shallow: true })}
      />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await getDishes()
  const menu = response

  return { props: { menu } }
}

export default Home
