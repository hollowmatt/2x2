import React, { useState } from "react";
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import Header from "../components/Header";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Create from "../components/Create";
import Edit from "../components/Edit";
import List from "../components/List";

function AppRouter() {  
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({...prevUser, ...data}));
    console.log(user);
  };

  const resetUser = () => {
    setUser({});
  };

  return(
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/list" element={<List/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;