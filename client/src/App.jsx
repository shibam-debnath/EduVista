import { useState } from 'react'
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Presentation from './pages/presentation/presentation';
import Home from './pages/home/home'
import Upload from './pages/upload/Upload';
import Generate from './pages/generate/Generate';
import PptxViewer from './pages/PptxViewer/PresentationViewer';
import './App.css'

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/generate" element={<Generate/>} />
          <Route path="/hello" element={<PptxViewer/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
