import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'normalize.css'
import 'react-datepicker/dist/react-datepicker.css'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

const theme = {
  gutter: '4rem',
  tablet: {
    gutter: '2rem',
  },
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    height: 100%;

    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  body {
    > * {
      height: 100%;
    }
  }

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker {
    display: flex;
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    border-bottom-right-radius: 0;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__header {
    border-bottom: none;
  }

  .react-datepicker__month-container {
    flex: 1 1 auto;
  }

  .react-datepicker__current-month {
    font-size: 1.1rem;
    padding: 0.5rem;
  }

  .react-datepicker__day-name {
    flex: 1;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    flex: 1;
    padding: 0.4rem;
    margin: 0;
    outline: none;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range {
    background-color: #a2996d;
    border-radius: 0;
    border-top-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    outline: none;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected:hover {
    background-color: #a2996d;
    border-radius: 0;
    border-top-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover {
    border-radius: 0;
    border-top-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__month-text--selected:hover,
  .react-datepicker__month-text--in-selecting-range:hover,
  .react-datepicker__month-text--in-range:hover,
  .react-datepicker__quarter-text--selected:hover,
  .react-datepicker__quarter-text--in-selecting-range:hover,
  .react-datepicker__quarter-text--in-range:hover {
    background-color: #a2996d;
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: #a2996d;
  }

  .react-datepicker__navigation {
    width: 2rem;
    height: 2rem;
    border: 1rem solid transparent;
    border-left-color: #a2996d;
    outline: none;
  }

  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 84px;

    @media (min-width: 768px) {
      right: 105px;
    }
  }

  .react-datepicker__navigation--previous {
    border: 1rem solid transparent;
    border-right-color: #a2996d;
    left: 0;
  }

  .react-datepicker__time-container {
    width: 84px;

    .react-datepicker__time .react-datepicker__time-box {
      width: 100%;
    }

    @media (min-width: 768px) {
      width: 105px;
    }
  }

  .react-datepicker__time-list-item--disabled {
    display: none !important;
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: #a2996d;
  min-height: 100%;
`

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="theme-color" content="#a2996d" />
          <meta
            name="description"
            content="Authentic Thai restaurant based in Wellington, New Zealand serving delicacies from the North & North-Eastern provinces."
          />
          <meta property="og:site_name" content="PhuThai Lanna Restaurant" />
          <meta
            property="og:description"
            content="Authentic Thai restaurant based in Wellington, New Zealand serving delicacies from the North & North-Eastern provinces."
          />
          <meta
            property="og:image"
            content="https://phuthailanna.co.nz/img/facebook-share.jpg"
          />
          <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <title>PhuThai Lanna Restaurant | Authentic Thai Cuisine</title>
        </Head>
        <GlobalStyle />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default MyApp
