import './App.scss';
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
import { auth } from './firebaseConfig';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import ChangeInfo from './components/ChangeInfo';

function App() {
  
  return (
    
    <div className="App">
      <HashRouter>
        <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/changeInfo' element={<ChangeInfo />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
