//Required libs
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

//setup express server
const app = express();
const PORT = process.env.PORT || 4040;
app.use(express.json());
app.use(cors());

//mock db (for now) storage
const users = [];
const usersInfo = [];
const wbrList = [];
const mgrs = [
  {
    id: "m1",
    name: "Clive D'Souza",
    title: "Director, Partner Engineering",
    ldap: "clivedsouza"
  },
  {
    id: "m2",
    name: "Michel Geadah",
    title: "Head of Partner Engineering, NorthAm",
    ldap: "mgeadah"
  },
  {
    id: "m3",
    name: "Rajarshi Ray",
    title: "Partner Engineering Manager",
    ldap: "rajaray"
  },
  {
    id: "m4",
    name: "Naren Batra",
    title: "Head of Solution Partner Engineering, NorthAm",
    ldap: "batranaren"
  },
  {
    id: "m5",
    name: "Ujjwal Rajbhandari",
    title: "Partner Engineering Manager",
    ldap: "ujjwalr"
  },
  {
    id: "m6",
    name: "Ziad Azzi",
    title: "Head of Cloud Partner Engineering, Central US & Canada",
    ldap: "azzi"
  }
];
const wbr_types = [
  {
    id: "wt1",
    type: "Weekly Insights",
    description: "Callouts, Key Business Trends, other insights.  General items of interest."
  },
  {
    id: "wt2",
    type: "Issues/Concerns/Risks",
    description: "Key Issues facing partners, items of concern or risks to Google/business.",
  },
  {
    id: "wt3",
    type: "OKR",
    description: "Status updates on OKR progress week over week, tied to annual OKRs",
  },
  {
    id: "wt4",
    type: "Highlights/Lowlights",
    description: "Key Customer or Partner Highlights/Lowlights.",
  }
];

//helper function to get a UUID
const generateID = () => crypto.randomUUID;

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
        params: ["email", "password"]
      },
      {
        name: "Get All Users",
        description: "API to login to the system, will be deprecated when integrating with Auth provider",
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

app.get("/api/all/users", (req, res) => {
  res.json({
    users: usersInfo,
  });
});

app.get("/api/all/mgrs", (req, res) => {
  res.json({
    managers: mgrs,
  });
});

app.get("/api/all/wbrtypes", (req, res) => {
  res.json({
    wbrtypes: wbr_types,
  });
});

app.post("/api/register", async(req,res) => {
  const { email, password, username, mgr=null } = req.body;
  const id = generateID();
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );
  if(result.length === 0) {
    const newUser = { id, email, password, username, mgr};
    const newUserInfo = {id, username, mgr};
    users.push(newUser);
    usersInfo.push(newUserInfo);
    console.log("account created with id: " + id);
    return res.json({
      message: "Account created successfully",
    });
  }
  res.json({
    error_message: `User already exists`,
  });

});

app.post("/api/login", (req, res) => {
  const {email, password} = req.body;
  
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length !== 1) {
    return res.json({
      error_message: "Invalid login attempt"
    });
  }

  res.json({
    message: "Login successful",
    id: result[0].id,
  })
});

//Start server
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});