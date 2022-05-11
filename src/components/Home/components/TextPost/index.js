import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Comments from '../Comments'
import img from '../../../../assets/images/test.png'

export default function TextPost(props) {
   // toggle comment section
  let [toggleComments, setToggleComments] = React.useState(false)

  


  return(
    <li>
        <div className='text-post'>
        <div className='post-user-info'>
          <img className='post-user-pic' src={props.userPic} />
          <p className='post-user-name'>{props.userName}</p>
        </div>
        <div className='post-content'>
          <p className='post-text'>{props.text}</p>
          {props.imgURL && <img src={props.imgURL} className='post-img' />}
        </div>
        
        </div>
        <div className='post-buttons'>
          <button className='comment-button' onClick={() => setToggleComments(prevState => !prevState)}><FontAwesomeIcon icon={faComment} /></button>
        </div>
        {toggleComments && <Comments id={props.id}/>}
      </li>
  )
}