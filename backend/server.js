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

const fflags = [];

//helper function to get a UUID
const generateID = () => crypto.randomUUID;
const saltRounds = 12;

//APIs
app.get('/', (req, res) => {
  res.json({
    fflags,
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
      usersInfo.push({
        username: user.data().username, 
        name: user.data().name, 
        email: user.data().email, 
        mgr: user.data().mgr
      });
    });
  });
  res.json({
    users: usersInfo,
  });
});

app.get("/api/all/mgrs", async(req, res) => {
  const mgrsInfo = [];
  await data.db.collection(data.COLLECTIONS.MGRS).get().then((querySnapshot) => {
    querySnapshot.forEach((mgr) => {
      mgrsInfo.push({
        ldap: mgr.data().ldap, 
        name: mgr.data().name, 
        email: mgr.data().email, 
        title: mgr.data().title, 
        region: mgr.data().region
      });
    });
  });
  res.json({
    mgrs: mgrsInfo,
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

app.post("/api/mgr", async(req,res) => {
  const { ldap, name, title, region } = req.body;
  const result = data.db.collection(data.COLLECTIONS.MGRS).doc(ldap);
  result.get().then((doc) => {
    if(doc.exists) {
      res.json({
        error_message: "manager already exists",
      });
    } else {
      const mgrRef = data.db.collection(data.COLLECTIONS.MGRS).doc(ldap);
      mgrRef.set({
        ldap: ldap,
        name: name,
        email: ldap + "@google.com",
        title: title,
        region: region
      });
      return res.json({
        message: "Manager added to system",
      })
    }
  });
});

app.post("/api/wbr", async(req,res) => {
  const { region } = req.body;
  //get next Monday as id
  //Check if it already exists
    //set title to "Week ending [following Friday data]"
    //save record
    //return msg
  return res.json({
    message: "Under construction - record not saved",
  });
});

app.post("/api/wbr/:id/entry", async(req,res) => {
  const wID = req.params.id;
  //switch on type
  //save details based on type
  return res.json({
    message: "Under construction - record not saved",
  });
});

app.post("/api/register", async(req,res) => {
  const { name, password, username, mgr=null } = req.body;
  const pass = await bcrypt.hash(password, saltRounds);
 
  const result = data.db.collection(data.COLLECTIONS.USERS).doc(username);
  result.get().then((doc) => {
    if(doc.exists) {
      res.json({
        error_message: "user already exists",
      });
    } else {
      const userRef = data.db.collection(data.COLLECTIONS.USERS).doc(username);
      userRef.set({
        email: username + "@google.com",
        name: name,
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
  const result = data.db.collection(data.COLLECTIONS.USERS).doc(username);
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

app.post("/api/fflag", async(req, res) => {
  const {flag_name, value} = req.body;
  const result = fflags.filter(
    (fflag) => fflag.flag_name === flag_name
  );
  const newFlag = {flag_name, value};
  if(result.length === 0) {
    fflags.push(newFlag);
    return res.json({
      message: "Feature flag added"
    })
  } else {
    fflags.splice(fflags.find(flag => flag.flag_name === flag_name), 1);
    fflags.push(newFlag);
    return res.json({
      message: "Feature flag updated"
    })
  } 
});

app.get("/api/all/fflag", async(req, res) => {
  res.json(
    fflags
  );
})

//Start server
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});