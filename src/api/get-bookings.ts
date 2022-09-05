import { utcToZonedTime, format } from 'date-fns-tz'
import firebase from 'firebase'
import admin from 'firebase-admin'

const serviceAccount = require('../../phuthai-lanna.json')

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'phuthai-lanna',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://phuthai-lanna.firebaseio.com',
  })
}

const db = admin.firestore()

const getBookings = async () => {
  const collection = db.collection('messages')

  await collection.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const { name, date, contactType } = doc.data()

      if (contactType === 'booking') {
        console.log('-------------------------------------------------')

        const bookingDate = new firebase.firestore.Timestamp(
          date._seconds,
          0
        ).toDate()
        const tDate = utcToZonedTime(bookingDate, 'Pacific/Auckland')
        console.log(tDate)

        const formattedDate = date
          ? format(tDate, 'dd MMM, yyyy', { timeZone: 'Pacific/Auckland' })
          : ''

        const formattedTime = date
          ? format(tDate, 'h:mm a', { timeZone: 'Pacific/Auckland' })
          : ''

        console.log(name, formattedDate, formattedTime)
      }
    })
  })
}

export default getBookings
