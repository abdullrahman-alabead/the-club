import './index.scss'
import React from 'react'
import { database } from '../../firebaseConfig'
import { getDocs, collection, onSnapshot } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers }  from '../../store/usersSlice'

export default function Sidebar() {
  // get users
  let usersCollectionRef = collection(database, 'users')
  let dispatch = useDispatch();
  let users = useSelector(store => store.users.users)

    
    React.useEffect(() => {
        dispatch(getUsers(usersCollectionRef))
    }, [])

    // toggle users menu
    let [toggled, setToggled] = React.useState(false)
    function toggleUsers() {
        document.querySelector('.sidebar').style.transform = `translateX(${toggled? '0': '100%'})`
        setToggled(prev => !prev)
    }

  return (
    <div className='sidebar'>
      <div className='toggleSidebar' onClick={toggleUsers}>Users</div>
      <h2 className='sidebar-header'>Users</h2>
      <ul className='users-list'>
        
        {users? users.map(user => {
          let data = user.data();
          return (<li className='user' key={user.id}>
          <img className='user-pic' src={data.photo} alt='user-pic'/>
          <p className='user-name'>{data.name}</p>
        </li>)
        }) : <><li className='user'>
        <div className='skeleton-user-pic'/>
        <p className='skeleton-user-name'></p>
      </li><li className='user'>
        <div className='skeleton-user-pic'/>
        <p className='skeleton-user-name'></p>
      </li><li className='user'>
        <div className='skeleton-user-pic'/>
        <p className='skeleton-user-name'></p>
      </li><li className='user'>
        <div className='skeleton-user-pic'/>
        <p className='skeleton-user-name'></p>
      </li></>
      }
      </ul>
    </div>
  )
}