import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
import { auth } from './firebaseConfig';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  
  return (
    
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
