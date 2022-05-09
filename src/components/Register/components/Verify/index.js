import { auth } from '../../../../firebaseConfig';
import './index.scss'

export default function Verify(props) {
  function navigateLogin() {
    document.querySelector(".verify-container").style.animation =
            "fadeOut 0.5s ease-out forwards";
            setTimeout(() => {
            props.setStage("login");
          }, 500);
  }
  return (
    <div className='verify-container'>
      <h2 className='verify-header header'>Verify Your Email</h2>
      <p className='verify-p'>please check your email for the verification link</p>
      <a href='https://gmail.com' className='email-btn' target='_blank'>Check Email</a>
      <p>When Verified, Go To</p>
      <button className='login-btn' onClick={navigateLogin}>Login</button>
    </div>
  )
}