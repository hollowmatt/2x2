const Firestore = require('@google-cloud/firestore');
const KEYFILE = process.env.KEY || './key_file.json';

//Firestore
const db = new Firestore({
    projectId: 'threadly-386216',
    keyFilename: KEYFILE,
  });
const COLLECTIONS = {
    USERS: 'users',
    WBRS: 'wbrs',
    ENTRIES: 'entries',
    MGRS: 'managers',
    WBR_TYPES: 'wbrtypes',
  };

//mock db (for now) storage

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

module.exports = {
    db: db,
    COLLECTIONS: COLLECTIONS,
    mgrs: mgrs,
    wbr_types: wbr_types,
    allwbrs: allwbrs,
    allwbrentries: allwbrentries
};