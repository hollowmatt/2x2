import { Card, Stack, Image, CardBody, Heading, Flex, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const BASE_PATH = process.env.REACT_APP_API_ADDRESS;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [mgrs, setMgrs] = useState([{ldap: "select..."}]);
  const [mgr, setMgr] = useState("select");
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (mgr==="select") {
      alert("Must select your manager to register")
    } else {
      signUp();
      setEmail("");
      setUsername("");
      setPassword("");
      setMgr("select");
    }
  };

  useEffect(() => {
    const fetchMgrs = () => {
      fetch(BASE_PATH + "/api/all/mgrs", {
      })
        .then((res) => res.json())
        .then((data) => setMgrs(mgrs.join(data.mgrs)))
        .catch((err) => console.error(err));
    };
    fetchMgrs();
  },[]);

  const signUp = () => {
    fetch(BASE_PATH + "/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
        mgr,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          navigate("/");
        }
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return(
    <main className='register'>
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
            <Heading size='md'>Create an Account</Heading>
            <form className='registerForm' onSubmit={handleSubmit}>
              <label htmlFor='username'>Username</label>
              <input
                  type='text'
                  name='username'
                  id='username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='email'>Email Address</label>
              <input
                  type='text'
                  name='email'
                  id='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
              <input
                  type='password'
                  name='password'
                  id='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='mgr'>Manager</label>
              <select id='mgr' name='mgr' onChange={(e) => setMgr(e.target.value)}>
                {mgrs.map((mgr) => (
                  <option value={mgr.ldap} key={mgr.id}>{mgr.name}</option>
                ))}
              </select>
              <br/>
              <Button colorScheme='blue' variant='outline' type='submit'>Register</Button>
              <br/>
              <p>
                  Have an account? <Link to='/'>Sign in</Link>
              </p>
            </form>
          </CardBody>
        </Stack>
      </Card>
    </main>
  );
}

export default Register;