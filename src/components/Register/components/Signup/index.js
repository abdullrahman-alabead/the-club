import "./index.scss";
import googleIcon from "../../../../assets/images/google-icon.png";
import React from "react";
import { validate } from "email-validator";
import { auth, database, app } from "../../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore'
import { nanoid } from "nanoid";

export default function Signup(props) {
  // keep track of the input
  let [data, setData] = React.useState({});

  function handleInput(e) {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }
  // sign up function
  function signUp(e) {
    e.preventDefault();
    // check if passwords match
    if (
      document.querySelector(".pass-input").value !=
      document.querySelector(".confirm-pass-input").value
    ) {
      alert("Password Doesn't Match");
      return;
    }
    // check for the terms and conditions
    if(!(document.querySelector("#check-terms").checked)){
      alert("you have to accept the terms")
      return
    }
    // validate email
    if (!validate(data.email)) {
      alert("Email not Valid");
      return;
    }

    // sign up the user

    let usersCollectionRef = collection(database, 'users')


    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        auth.signOut()
        // add user info to firestore
        updateProfile(user.user, {displayName: data.nickname, photoURL: 'https://firebasestorage.googleapis.com/v0/b/the-club-1.appspot.com/o/defaultPic.jpg?alt=media&token=ca11e0f6-122d-4fd5-aa7f-65386fcf7f56'})
        .then()
        .catch(err => alert(err.message))
        sendEmailVerification(user.user).then(() => {
          

          addDoc(usersCollectionRef, {id:nanoid(),name: data.nickname, photo: 'https://firebasestorage.googleapis.com/v0/b/the-club-1.appspot.com/o/defaultPic.jpg?alt=media&token=ca11e0f6-122d-4fd5-aa7f-65386fcf7f56'})
          .then(() => {

            document.querySelector(".signup-container").style.animation =
            "fadeOut 0.5s ease-out forwards";
            
            setTimeout(() => {
              props.setStage("verify");
            }, 500);
          })
          
        });
      })
      .catch((err) => alert(err.message));
  }

  // check password matching
  function checkPassword() {
    if (
      document.querySelector(".pass-input").value !=
      document.querySelector(".confirm-pass-input").value
    ) {
      document.querySelector(".confirm-pass-input").style.color = "red";
    } else if (
      document.querySelector(".pass-input").value ==
      document.querySelector(".confirm-pass-input").value
    ) {
      document.querySelector(".confirm-pass-input").style.color = "green";
    }
  }

  // go to signup page
  function navigateLogin() {
    document.querySelector(".signup-container").style.animation =
            "fadeOut 0.5s ease-out forwards";

          setTimeout(() => {
            props.setStage("login");
          }, 500);
  }


  return (
    <div className="signup-container">
      <button className="goto-login" onClick={navigateLogin}>login</button>
      <h2 className="sign-up-header header">Sign Up</h2>
      <form onSubmit={signUp}>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          className="email-input"
          onChange={handleInput}
          required
        />
        <input type='text' name='nickname' placeholder='Nickname...' className='name-input' onChange={handleInput}/>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          className="pass-input"
          onChange={(e) => {
            handleInput(e);
            checkPassword();
          }}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password..."
          className="confirm-pass-input"
          onChange={checkPassword}
          required
        />
        <div className="terms">
        <input type='checkbox' className="check-terms" id="check-terms" />
        <p>I agree with the <span onClick={() => alert("this is just a test")}>terms of use</span> and <span onClick={() =>alert("this is just a test")}>privacy policy</span></p>
        </div>
        <button className="signup-btn btn" onClick={signUp}>
          Sign In
        </button>
      </form>
    </div>
  );
}
