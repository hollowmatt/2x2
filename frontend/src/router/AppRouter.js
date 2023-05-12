import React, { useState } from "react";
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import FirstStep from "../components/FirstStep";
import SecondStep from "../components/SecondStep";
import ThirdStep from "../components/ThirdStep";
import Header from "../components/Header";
import Login from "../components/Login";

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
          <Route path="/" element={<TopNav />}>
            <Route element={<FirstStep user={user} updateUser={updateUser} />} path="/"/>
            <Route element={<SecondStep user={user} updateUser={updateUser}/>} path="/second"/>
            <Route element={<ThirdStep user={user} updateUser={updateUser} resetUser={resetUser}/>} path="/third"/>
            <Route element={<Login/>} path="/login"/>
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;