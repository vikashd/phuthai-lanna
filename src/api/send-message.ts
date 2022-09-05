import { of, from } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { FormData } from '../components/contact-form'

const sendMessage = (db: firebase.firestore.Firestore, data: FormData) =>
  from(db.collection('messages').add(data)).pipe(
    map((e) => e.id),
    catchError(() => of('An error occurred'))
  )

export default sendMessage
