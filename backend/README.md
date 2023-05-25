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
  