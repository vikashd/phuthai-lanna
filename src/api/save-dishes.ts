/*const saveDB = () => {
  if (!db.current) {
    return
  }

  const batch = db.current.batch()

  if (!batch) {
    return
  }

  Object.keys(data).forEach((category) =>
    data[category].forEach((doc) => {
      batch.set(db.current!.collection(`dishes/${category}/items`).doc(), doc)
    })
  )
  batch
    .commit()
    .then(function (e) {
      console.log('Document written with ID', e)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}*/
export default () => {}
