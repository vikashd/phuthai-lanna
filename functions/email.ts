import { utcToZonedTime, format } from 'date-fns-tz'
import firebase from 'firebase'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import smtpTransport from 'nodemailer-smtp-transport'

const cors = require('cors')({ origin: true })
const serviceAccount = require('../phuthai-lanna.json')

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'phuthai-lanna',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://phuthai-lanna.firebaseio.com',
  })
}

const transporter = nodemailer.createTransport(
  smtpTransport({
    name: 'phuthaiesarn.co.nz',
    host: 'gator4112.hostgator.com',
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'lanna@phuthaiesarn.co.nz',
      pass: '',
    },
  })
)

const sendMail = functions.https.onRequest(async (req, res) => {
  const {
    body: { id },
  } = req
  const db = admin.firestore()

  const messageDoc = await db.collection('messages').doc(id).get()

  if (!messageDoc.exists) {
    res.send('Booking not found')
  }

  cors(req, res, () => {
    const {
      contactType,
      name,
      date,
      email,
      message,
      people,
      telephone,
    } = messageDoc.data()!

    const bookingDate = new firebase.firestore.Timestamp(
      date._seconds,
      0
    ).toDate()
    const tDate = utcToZonedTime(bookingDate, 'Pacific/Auckland')

    const formattedDate = date
      ? format(tDate, 'dd MMM, yyyy', { timeZone: 'Pacific/Auckland' })
      : ''

    const formattedTime = date
      ? format(tDate, 'h:mm a', { timeZone: 'Pacific/Auckland' })
      : ''

    const heading =
      contactType === 'booking'
        ? `
      Date: ${formattedDate}<br />
      Time: ${formattedTime}<br />
      Number of people: ${people}<br /><br />
    `
        : ''

    const metaData =
      contactType === 'booking'
        ? `
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "FoodEstablishmentReservation",
          "underName": {
            "@type": "Person",
            "name": "${name}"
          },
          "reservationFor": {
            "@type": "FoodEstablishment",
            "name": "PhuThai Lanna",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Cnr Vivian & Tory St.",
              "addressLocality": "Wellington",
              "addressRegion": "Wellington",
              "postalCode": "6001",
              "addressCountry": "New Zealand"
            }
          },
          "startTime": "${tDate}",
          "partySize": "${people}"
        }
      </script>`
        : ''

    const booking: Mail.Options = {
      from: `${name} <lanna@phuthaiesarn.co.nz>`,
      to: 'lanna@phuthaiesarn.co.nz',
      replyTo: email,
      subject:
        contactType === 'booking'
          ? `PhuThai Lanna Reservation - ${formattedDate}`
          : 'PhuThai Lanna Enquiry',
      html: `
        ${metaData}
        <table>
          <tr>
            <td>
              ${heading}
              ${message ? `${message}<br /><br />` : ''}
              ${name}<br />
              e: ${email}<br />
              ${telephone ? `t: ${telephone}` : ''}
            </td>
          </tr>
        </table>
      `,
    }

    const content =
      contactType === 'booking'
        ? `
      <strong style="font-size: 18px; font-weight: bold; color: black;">Your booking request:</strong><br/><br/>
      ${heading}
      ${message ? `${message}<br /><br />` : ''}
      e: ${email}<br />
      ${telephone ? `t: ${telephone}` : ''}
    `
        : `
      <strong style="font-size: 18px; font-weight: bold; color: black;">Your message:</strong><br/><br/>
      ${message}<br /><br />
      e: ${email}<br />
      ${telephone ? `t: ${telephone}` : ''}
    `

    const confirmation: Mail.Options = {
      from: `PhuThai Lanna <lanna@phuthaiesarn.co.nz>`,
      to: email,
      subject:
        contactType === 'booking'
          ? `PhuThai Lanna Reservation Received - ${formattedDate}`
          : 'PhuThai Lanna confirmation',
      html: `
      <table>
        <tr>
          <td>
            This is an automated response to confirm we have received your message.<br/><br/>If you have made a reservation request we aim to get back to you within 24 hours. If for any reason you do not hear from us within that time please do not hestitate to call us.
          </td>
        </tr>
        <tr>
          <td height="20px">&nbsp;</td>
        </tr>
        <tr>
          <td>
            ${content}
          </td>
        </tr>
        <tr>
          <td height="20px">&nbsp;</td>
        </tr>
        <tr>
          <td>
            PhuThai Lanna Restaurant<br />
            39-41 Cnr. Tory & Vivian<br />
            Wellington<br />
            Tel: 04-801-7771<br /><br />
            <a href="https://www.google.co.nz/maps/place/PhuThai+Lanna+Restaurant/@-41.2963039,174.7791147,17z/data=!4m5!1m2!2m1!1sphuthai+lanna!3m1!1s0x6d38afdbc516f61d:0x420cf13522c8dac2">Click here for location</a>
          </td>
        </tr>
      </table>
      `,
    }

    transporter.sendMail(booking, (bookingError, bookingInfo) => {
      if (bookingError) {
        res.send(bookingError.toString())
        return
      }

      transporter.sendMail(
        confirmation,
        (confirmationError, confirmationInfo) => {
          if (confirmationError) {
            res.send(confirmationError.toString())
            return
          }

          res.send('Sent')
        }
      )
    })
  })
})

export default sendMail
