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

const getDishes = async () => {
  let items: Array<any> = []
  const collection = db.collection('dishes')

  await collection
    .orderBy('order')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const sfRef = collection.doc(doc.id)
        const { name } = doc.data()

        items.push(
          sfRef
            .listCollections()
            .then((collections) => ({ collections, id: doc.id, name }))
        )
      })
    })

  await Promise.all<{
    collections: firebase.firestore.CollectionReference<
      firebase.firestore.DocumentData
    >[]
    id: string
    name: string
  }>(items).then((data) => {
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

  const result = await Promise.all(items)

  return result
}

export default getDishes
