# 2x2 Backend Server
## Overview
This is the backend (server))for the 2x2 application, it is a node/express API server, with server.js as the entry point

### Development mode
`npm run dev`
Runs the server in the development mode.<br />
Open [http://localhost:4040](http://localhost:4040) to view it in the browser (default route will give list of APIs).

The server will reload if you make edits.<br />
You will also see any lint errors in the console.

### Production mode 
`npm start`
Runs in production mode.<br />

## Tech Stack

### Client
There is a React client, but any client could potentially use the backend.

### BackEnd
On the backend, the following dependencies are installed:
- bcrypt (for password hashing)
- cors (for allowing cross-site API requests)
- @google-cloud-firestore (for connecting to firestore)
  

## Routes
`GET /`  - root API to return list of APIs
`GET /api/all/users` - return list of users with managers
`GET /api/all/mgrs` - return list of managers
`GET /api/all/wbrtypes` - return list of WBR types
`GET /api/all/wbrs`  - return list of WBRs
`GET /api/all/wbrs/id/entries` - return list of entries for a WBR
`POST /api/register` - create an account
`POST /api/login` - login
`POST /api/wbr` - create WBR
`POST /api/wbr/id/entry` - create WBR entry
`DELETE /api/login` - logout
`DELETE /api/wbr/id` - delete WBR
`DELETE /api/wbr/id/entry/id` - delete WBR entry
...
