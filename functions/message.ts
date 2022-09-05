import { firestore } from 'firebase-functions'
import fetch from 'isomorphic-unfetch'

const message = firestore.document('messages/{message}').onCreate((snap) => {
  fetch('https://us-central1-phuthai-lanna.cloudfunctions.net/sendMail', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: snap.id }),
  })
})

export default message
