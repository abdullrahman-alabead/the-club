import  './index.scss'
import React from 'react'
import Verify from './components/Verify'
import Signup from './components/Signup'
import Login from './components/Login'


export default function Register() {
  // signning stages
  let [stage, setStage] = React.useState('signup')

  
  return ((stage == 'signup' && <Signup setStage={setStage} />)
  || (stage=='verify' && <Verify setStage={setStage}/>)
  || (stage == 'login' && <Login setStage={setStage}/>))
}