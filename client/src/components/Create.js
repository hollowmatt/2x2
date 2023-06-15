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
      <Heading>Create Entry</Heading>
      <label htmlFor="wbrType" style={{fontWeight:"bold", paddingRight:"5px"}}>Entry Type:</label>
      <select id='wbrType' name='wbrType' onChange={(e) => setWbr(e.target.value)}>
        {wbrTypes.map((wbrtype) => (
          <option value={wbrtype.id} key={wbrtype.id}>{wbrtype.type}</option>
        ))}
      </select>
      <section>
        <label htmlFor="product" style={{fontWeight:"bold", paddingRight:"5px"}}>Products: </label>
        <teextarea name="product">[eventually this will be chips]</teextarea>
        <hr/>
        <label htmlFor="title" style={{fontWeight:"bold", padding:"5px"}}>Title: </label>
        <input name="title"></input>
        <br/>
        <label htmlFor="description" style={{fontWeight:"bold", paddingRight:"5px"}}>description: </label>
        <textarea name="description"></textarea>
        <br/>
        <label htmlFor="impact" style={{fontWeight:"bold", paddingRight:"5px"}}>Impact: </label>
        <select>
          <option value='low' key='low'>Low</option>
          <option value='med' key='med'>Medium</option>
          <option value='high' key='high'>High</option>
        </select>
      </section>
    </div>
  );
}

export default Create;