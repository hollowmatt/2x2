import React, { useState, useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Create from './components/Create';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
