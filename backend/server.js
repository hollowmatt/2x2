//Required libs
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Firestore = require('@google-cloud/firestore');
const KEYFILE = process.env.KEY || './key_file.json';

//setup express server
const app = express();
const PORT = process.env.PORT || 4040;
app.use(express.json());
app.use(cors());

//Firestore
const db = new Firestore({
  projectId: 'threadly-386216',
  keyFilename: KEYFILE,
});

//mock db (for now) storage
const users = [];

//Placeholder until in Firestore
const mgrs = [
  {
    id: "m0",
    name: "select...",
    title: "select",
    ldap: "clivedsouza"
  },
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

//placehoder  until in Firestore
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

//placeholder until in Firestore
const allwbrs = [
  {
    id: 'w1',
    region: 'NorthAm',
    title: "Week of May 22, 2023"
  },
  {
    id: 'w2',
    region: 'NorthAm',
    title: "Week of May 29, 2023"
  }
];
//placeholder until in Firestore
const allwbrentries = [
  {
    wbr_id: "w1",
    wbrtype: 'wt1',
    username: 'chopper',
    mgr: "azzi",
    product: ['App Engine', 'Firestore'],
    title: "CI/CD on GCP",
    description: "Using App Engine and Firestore, building a great app is easy.",
    impact: "N/A",
    escalated: "no",
    partner: "SADA"
  },
  {
    wbr_id: "w1",
    wbrtype: 'wt2',
    username: 'hollowmatt',
    mgr: "azzi",
    product: ['Firestore'],
    title: "Unclear documentation",
    description: "Integration of App Engine and Firestore is complicated, and documentation is unclear.",
    impact: "Moderate",
    escalated: "yes",
    buganizer: "123456",
    partner: "SADA"
  },
  {
    wbr_id: "w2",
    wbrtype: 'wt3',
    username: 'chopper',
    mgr: "azzi",
    okr: "PDQ",
    title: "Quality review of CI/CD pipeline",
    description: "Using App Engine and Firestore, SADA built a full app and pipeline.  Conduccted review...",
    dri_impact: "increase",
    pdq_link: "http://google.com",
    escalated: "no",
    partner: "SADA"
  },
  {
    wbr_id: "w2",
    wbrtype: 'wt4',
    username: 'hollowmatt',
    mgr: "azzi",
    product: ['App Engine', 'Firestore'],
    title: "Increase in revenue and consumption with CI/CD on GCP",
    description: "Using App Engine and Firestore, building a great app is easy.  This has increased revenue and consumption",
    type: "Highlight",
    escalated: "no",
    partner: "SADA"
  }
];

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
  await db.collection('users').get().then((querySnapshot) => {
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
    mgrs: mgrs,
  });
});

app.get("/api/all/wbrtypes", (req, res) => {
  res.json({
    wbrtypes: wbr_types,
  });
});

app.get("/api/all/wbrs", (req, res) => {
  res.json({
    wbrs: allwbrs,
  });
});

app.get("/api/all/wbrs/:id", (req, res) => {
  const wID = req.params.id;
  const wbr = allwbrs.find(_entry => _entry.id === wID);
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
  const items = allwbrentries.filter(_entry => _entry.wbr_id === wID);

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
 
  const result = db.collection('users').doc(username)
  result.get().then((doc) => {
    if(doc.exists) {
      res.json({
        error_message: "user already exists",
      });
    } else {
      const userRef = db.collection('users').doc(username);
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
  const result = db.collection('users').doc(username)
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