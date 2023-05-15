import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  
  const signOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };

  return(
    <nav className="navbar">
      <Heading size='lg'>PE WBR</Heading>
      <div className="navbarRight">
        <Button variant="solid" colorScheme="whiteAlpha"><Link to="/dashboard">Dashboard</Link></Button>
        &nbsp;
        <Button variant='solid' colorScheme='whiteAlpha' onClick={signOut}>Sign out</Button>
      </div>
    </nav>
  );
}

export default Nav;