import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Create from './components/Create';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
