import './index.scss'
import googleIcon from '../../../../assets/images/google-icon.png'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../../../firebaseConfig'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'

export default function Login(props) {
  let [data, setData] = React.useState({})

  // keep track of the user input
  function handleInput(e) {
    setData(prevData => {return {...prevData, [e.target.name]: e.target.value}})
  }

  // Login with email and password
  let navigate = useNavigate();
  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      if(auth.currentUser.emailVerified){
        navigate('/home')
      }else if(!(auth.currentUser.emailVerified)){
        auth.signOut()
        alert('email not verified')
      }
      })
    .catch(err => console.log(err))
    
  }

  // check if signed in
  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user){
        navigate('/home')
      }
    },[])
  })


  // goto signin
  function navigateSignin() {
    document.querySelector(".login-container").style.animation ="fadeOut 0.5s ease-out forwards";
      
      setTimeout(() => {
        props.setStage('signup')
      }, 500);
  }
  return (
    <div className='login-container' >
      <button className='goto-signin' onClick={navigateSignin}>SignIn</button>
      <h2 className='login-header header'>Log In</h2>
      <form>
        <input type='email' className='email' name='email' onChange={handleInput} placeholder='Email...' required />
        <input type='password' className='password' name='password' onChange={handleInput} placeholder='Password...' required />
        <button className='login-btn btn' onClick={signIn}>Login</button>
      </form>
    </div>
  )
}