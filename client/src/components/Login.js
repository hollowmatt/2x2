import { Card, Stack, Image, CardBody, Heading, Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_PATH = process.env.REACT_APP_API_ADDRESS;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser();
    setUsername("");
    setPassword("");
  };

  const loginUser = () => {
    fetch(BASE_PATH + "/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/dashboard");
          localStorage.setItem("_id", data.id);
        }
      })
      .catch((err) => console.error(err));
  };

  return(
    <main className="login">
      <Card
        direction={{base: 'column', sm: 'row'}}
        overflow='hidden'
        varitant='outline'
      >
        <Flex align='center'>
          <Image
            marginLeft='10px'
            objectFit='cover'
            boxSize='300px'
            maxW={{ base: '100%', sm: '300px' }}
            src='/img/PE-CoE-badge-300.png'
            alt='Login'
          />
        </Flex>
        <Stack>
          <CardBody width='600px'>
            <Heading size='md'>Log in to your account</Heading>
            <form className="loginForm" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type='password'
                name='password'
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button colorScheme='blue' variant='outline' type='submit'>Sign In</Button>
              <br/>
              <p>
                No account?  <Link to='/register'>Create One</Link>
              </p>
            </form>
          </CardBody>
        </Stack>
        
      </Card>
    </main>
  );
}

export default Login;