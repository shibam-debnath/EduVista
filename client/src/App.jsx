import { useState } from 'react'
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Presentation from './pages/presentation/presentation';
import Home from './pages/home/home'
import Upload from './pages/upload/Upload';
import Generate from './pages/generate/Generate';
import PptxViewer from './pages/PptxViewer/PresentationViewer';
import './App.css'
import Login from './pages/login/Login';
import useToken from './auth/useToken';
import Navbar from './components/Navbar/Navbar';

function App() {

  const { token, removeToken, setToken } = useToken();
  
  console.log('App mein token')
  console.log(token)


  return (
    <Router>
      {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
      :(
        <>
          <Routes>
            <Route path="/" element={<Home token={token} removeToken={removeToken} setToken={setToken} />} />
            <Route path="/presentation" element={<Presentation token={token} setToken={setToken} />} />
            <Route path="/upload" element={<Upload token={token} setToken={setToken} />} />
            <Route path="/generate" element={<Generate token={token} setToken={setToken} />} />
            <Route path="/hello" element={<PptxViewer token={token} setToken={setToken}/>} />
          </Routes>
        </>
      )}
    </Router>
  )
}

export default App
