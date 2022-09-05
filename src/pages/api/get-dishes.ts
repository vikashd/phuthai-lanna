import * as firebase from 'firebase/app'
import admin from 'firebase-admin'

const serviceAccount = require('../../../phuthai-lanna.json')

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'phuthai-lanna',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://phuthai-lanna.firebaseio.com',
  })
}

const db = admin.firestore()

const getDishes = async (req, res) => {
  let items: Array<any> = []

  await db
    .collection('dishes')
    .get()
    .then((snapshot) => {
      snapshot.forEach(async (doc) => {
        const sfRef = db.collection('dishes').doc(doc.id)
        const { name } = doc.data()

        items.push(
          sfRef
            .listCollections()
            .then((collections) => ({ collections, id: doc.id, name }))
        )
      })
    })

  await Promise.all(items).then((data) => {
    items = []
    data.forEach((collection) => {
      const { id, name, collections } = collection

      collections.forEach((col: firebase.firestore.CollectionReference) => {
        items.push(
          col.get().then((t: firebase.firestore.QuerySnapshot) => {
            let obj: {
              id: string
              name: string
              items: Array<firebase.firestore.DocumentData>
            } = { id, name, items: [] }
            t.forEach((q) => {
              obj.items.push(q.data())
            })
            return obj
          })
        )
      })
    })
  })

  await Promise.all(items).then((e) => {
    res.statusCode = 200
    res.json(e)
  })
}

export default getDishes
