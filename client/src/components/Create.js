import { Card, Stack, Image, CardBody, Heading, Flex, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
const BASE_PATH = process.env.REACT_APP_API_ADDRESS;

function Create() {
  const [wbr, setWbr] = useState({});
  const [wbrTypes, setWbrTypes] = useState([]);

  useEffect(() => {
    const fetchWbrTypes = () => {
      fetch(BASE_PATH + "/api/all/wbrtypes", {
      })
        .then((res) => res.json())
        .then((data) => setWbrTypes(data.wbrtypes))
        .catch((err) => console.error(err));
    };
    fetchWbrTypes();
  },[]);

  return(
    <div>
      <Nav/>
      <p>Placeholder</p>
      <select id='wbrType' name='wbrType' onChange={(e) => setWbr(e.target.value)}>
        {wbrTypes.map((wbrtype) => (
          <option value={wbrtype.id} key={wbrtype.id}>{wbrtype.type}</option>
        ))}
      </select>
    </div>
  );
}

export default Create;