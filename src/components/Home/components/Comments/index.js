import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { database } from '../../../../firebaseConfig'

export default function Comments(props) {
  // getComments
  console.log(props.id)
  let commentsCollectionRef = collection(database, 'posts', `${props.id}`, 'comments')
  let [comments, setComments] = React.useState(null)
  React.useEffect(() => {
    onSnapshot(commentsCollectionRef, data => {
      let docs = data.docs
      setComments(docs.map(doc => doc.data()))
    })
  }, [])

  // send Comment
  let [comment, setComment] = React.useState('')
  function sendComment() {
    addDoc(commentsCollectionRef, {comment: comment})
  }
  return(
    <div className='comments-section'>
          <ul className='comments'>
            {comments && comments.map(comment => <li className='comment'><p>{comment.comment}</p></li>)}
          </ul>
          <div className='send-comment'>
          <input className='my-comment' placeholder='add a Comment...' type='text' onChange={(e) => setComment(e.target.value)} />
          <button className='comment-btn' onClick={sendComment}>
          <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          </div>
        </div>
  )
}