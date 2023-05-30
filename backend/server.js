//Required libs
const express = require('express');
const cors = require('cors');
const data = require('./data');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

//setup express server
const app = express();
const PORT = process.env.PORT || 4040;
app.use(express.json());
app.use(cors());

//helper function to get a UUID
const generateID = () => crypto.randomUUID;
const saltRounds = 12;

//APIs
app.get('/', (req, res) => {
  res.json({
    message: "PE WBR - API set",
    routes: [
      {
        name: "Register",
        description: "API to register a new user of the system - to be deprecated when integrating with Auth provider",
        method: "POST",
        route: "/api/register",
        params: ["email", "password", "username", "mgr"]
      },
      {
        name: "Login",
        description: "API to login to the system, will be deprecated when integrating with Auth provider",
        method: "POST",
        route: "/api/login",
        params: ["username", "password"]
      },
      {
        name: "Get All Users",
        description: "API to retrieve list of users, with their manager",
        method: "GET",
        route: "/api/all/users",
        params: "none"
      },
      {
        name: "Get All Mgrs",
        description: "Return list of all managers in NorthAM",
        method: "GET",
        route: "/api/all/mgrs",
        params: "none"
      },
      {
        name: "Get WBR Types",
        description: "Return LOV for types of WBRs",
        method: "GET",
        route: "/api/all/wbrtypes",
        params: "none"
      }
    ]
  })
});

app.get("/api/all/users", async(req, res) => {
  const usersInfo = [];
  await data.db.collection(data.COLLECTIONS.USERS).get().then((querySnapshot) => {
    querySnapshot.forEach((user) => {
      usersInfo.push({username: user.data().username, mgr: user.data().mgr});
    });
  });
  res.json({
    users: usersInfo,
  });
});

app.get("/api/all/mgrs", (req, res) => {
  res.json({
    mgrs: data.mgrs,
  });
});

app.get("/api/all/wbrtypes", (req, res) => {
  res.json({
    wbrtypes: data.wbr_types,
  });
});

app.get("/api/all/wbrs", (req, res) => {
  res.json({
    wbrs: data.allwbrs,
  });
});

app.get("/api/all/wbrs/:id", (req, res) => {
  const wID = req.params.id;
  const wbr = data.allwbrs.find(_entry => _entry.id === wID);
  if(wbr) {
    res.json({
      wbr: wbr,
    });
  } else {
    res.json({message: `WBR ID ${wID} doesn't exist`});
  }
});

app.get("/api/all/wbrs/:id/entries", (req, res) => {
  const wID = req.params.id;
  const items = data.allwbrentries.filter(_entry => _entry.wbr_id === wID);

  if(items.length > 0) {
    res.json({
      entries: items,
    });
  }
  else {
    res.json({message: `WBR ID ${wID} doesn't exist`});
  }
})

app.post("/api/register", async(req,res) => {
  const { email, password, username, mgr=null } = req.body;
  const pass = await bcrypt.hash(password, saltRounds);
 
  const result = data.db.collection(data.COLLECTIONS.USERS).doc(username)
  result.get().then((doc) => {
    if(doc.exists) {
      res.json({
        error_message: "user already exists",
      });
    } else {
      const userRef = data.db.collection('users').doc(username);
      userRef.set({
        email: email,
        password: pass,
        username: username,
        mgr: mgr
      });
      return res.json({
        message: "Account created successfully",
      });
    }
  });
  
});

app.post("/api/login", async(req, res) => {
  const {username, password} = req.body;
  const result = data.db.collection(data.COLLECTIONS.USERS).doc(username)
  result.get().then((doc) => {
    if(doc.exists) {
      bcrypt.compare(password, doc.data().password, (error, result) => {
        if(result) {
          res.json({
            message: "Login Successful",
            id: username,
          })
        } else {
          res.json({
            error_message: "Invalid login attempt"
          })
        }
      });
    }
    else {
      return res.json({
        error_message: "Invalid login attempt"
      });
    }
  })  
});

//Start server
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});