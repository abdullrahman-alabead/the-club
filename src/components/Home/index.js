import './index.scss'
import Header from '../Header';
import Sidebar from '../Sidebar';
import React from 'react';
import TextPost from './components/TextPost';
import { auth, database } from '../../firebaseConfig'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newPostActions } from '../../store/newPostSlice';
import { postsActions } from '../../store/PostsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export default function Home() {
  let dispatch = useDispatch()
  // check if logged in
  let [loggedin, setLoggedin] = React.useState(false);
  let navigate = useNavigate()
  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        setLoggedin(true)
        // if not : navigate to login page
      }else(
        navigate('/')
      )
    },[])
  })

  updateProfile(auth.currentUser, {photoURL: 'https://firebasestorage.googleapis.com/v0/b/the-club-1.appspot.com/o/Nolan.png?alt=media&token=8b33e551-8548-4eb0-b98d-547177d1e2b5'})
  
  // send post
  let postsCollectionRef = collection(database, 'posts')
  let post = useSelector(store => store.newPost);
  function sendPost() {
    let id = nanoid();
    document.querySelector('.new-post-text').value= ''
    setDoc(doc(database, 'posts', id), {...post, id:id})
    .then(alert('posts Added'))
    .catch(err => console.log(err.message))
  }

  // get Posts
  let [postsLength, setPostsLength] = React.useState(0)
  let posts = useSelector(store => store.posts)
  let q = query(postsCollectionRef, orderBy('sendTime', 'desc'));

  onSnapshot(q, (data)=>{
    let docs = data.docs

    setPostsLength(docs.length)
  })
  React.useEffect(() => {
    getDocs(q).then((data) => {
      let docs = data.docs;
      dispatch(postsActions.setPosts(docs.map(doc => doc.data())))
    })
  }, [postsLength])

    
  return (loggedin && 
    <>
    <Header />
    <Sidebar />
    <ul className='posts-list'>
      <li className='add-post'>
        <input className='new-post-text' placeholder='What are you thinking about ?!' onChange={(e) => {dispatch(newPostActions.updatePostText({text:e.target.value, time: Date.now()}))}}/>
        <div className='buttons' >
        <button className='send-post' onClick={sendPost}><FontAwesomeIcon icon={faPaperPlane} /></button>
        <button className='add-image' onClick={() => alert("Under Maintenance")}><FontAwesomeIcon icon={faImage} /></button>
        </div>
      </li>
      {posts && posts.map(post => {return <TextPost {...post} />})}
    </ul>
    </>)
    
}
