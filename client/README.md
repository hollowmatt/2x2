# 2x2 Front End Client
## Overview
This is the frontend client for the 2x2 application.  By default, using 
`npm start` will run in development mode (using the .env file).  If you run in production mode with `npm build`, it will use the .env.production file.
### Development mode
`npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Production mode 
`npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Tech Stack

### Client
The app makes use of:
- Chakra UI
- React Router
- React

### BackEnd
The client connects to a backend Node.js/Express server, which in turn connects to a Firestore database.  In development mode, you will need to run the backend on your local machine too, likely on port 4040.  In Production mode, you will need to put the connection information in the .env.production file.
