import './index.scss';
import React from 'react';
import {auth, database, storage} from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { updateProfile } from 'firebase/auth';
import { collection,doc,getDocs,query,updateDoc,where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function ChangeInfo() {
  let navigate = useNavigate();
  let user = auth.currentUser;

  let [newImg, setNewImg] = React.useState(null)
  let [newName, setNewName] = React.useState('')

  let filePath;
  function previewImage(img) {
    let reader = new FileReader();
    if(img != null){
      reader.readAsDataURL(img);
      reader.addEventListener('load', (e) => {
        document.querySelector(".user-img").setAttribute('src', e.target.result)
        
      })
    }
  }
  function updateInfo() {
    if(!newImg && !newName){
      alert('Nothing to Update!')
      return
    }
    let username = user.displayName;
    if(newImg)
    {
      let sotrageRef = ref(storage, `usersImages/${document.querySelector('.file-input').files[0].name}`)
      let uploadTask = uploadBytesResumable(sotrageRef, newImg)
      uploadTask.on('state_changed',
      (snapshot) => {},
      (err) => {alert(err)},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((newImageURL) => {
        updateProfile(auth.currentUser, {displayName: newName? newName : username, photoURL: newImg? newImageURL : user.photoURL})
        .then(() => {
          let q = query(collection(database, 'users'), where('name', '==', `${username}`));
          getDocs(q).then((data) => {
            console.log(data)
            updateDoc(doc(database, 'users', data.docs[0].id), {name: newName? newName : username, photo: newImg? newImageURL : user.photoURL})
            .then(alert('Profile Info Updated'))
            .catch(err => alert(err.message))
          }).catch(err => alert(err.message))
        }).catch(err => console.log(err.message))
        })
      }
      )
    }else if(newName){
      updateProfile(auth.currentUser, {displayName: newName})
        .then(() => {
          let q = query(collection(database, 'users'), where('name', '==', `${username}`));
          getDocs(q).then((data) => {
            console.log(data)
            updateDoc(doc(database, 'users', data.docs[0].id), {name: newName})
            .then(alert('User Info Updated'))
            .catch(err => alert(err.message))
          }).catch(err => alert(err.message))
        }).catch(err => console.log(err.message))
    }else{alert("nothing to change")}
      
    
  }

  return (
    <div className='change-info-container'>
      <h2 className='change-info-header header'>Change Info</h2>
      <button className='goto-home' onClick={() => navigate('/home')}>Home</button>
      <div className='info'>
        <div className='img-change'>
          <img src={user.photoURL} className='user-img' alt='user-pic' />
          <button className='update-photo' onClick={() => {document.querySelector('.file-input').click()}}>update Photo</button>
          <input type='file' accept='image/' style={{display: 'none'}} className='file-input' onChange={(e) => {previewImage(e.target.files[0]); setNewImg(e.target.files[0])}}/>
        </div>
        <div className='username-change'>
          <p className='user-name'>{user.displayName}</p>
          <input type='text' className='new-name' onChange={(e) => {setNewName(e.target.value)} } placeholder='New Name...' />
        </div>
      </div>
      <button className='update-info' onClick={updateInfo}>Update Info</button>
    </div>
  )
}