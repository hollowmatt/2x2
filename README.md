# 2x2
Two by Two app, with both a client and backend.

## Layers
### Client
The frontend is in the *client* folder.  Information on it can be found in the readme there.  It is a react based UI

### Backend 
The backend is in the *backend* folder.  Information on it can be found there.  It is a node/express API layer.

### Storage
The storage system is using Firestore

## Build and Deploy to Google Cloud
You can run the full stack (other than Firestore) locally, or run it all in the cloud.  It is designed to run on Google App Engine, with a Firebase/Firestore storage layer

### Deploy to GCP
You will need to setup a few files
*client*
 - .gitcloudignore
 - .env.production
 - clientAppEngine.yaml

*backend*
- .gitcloudignore
- serverAppEngine.yaml
- key_file.json


When ready to deploy, perform the following

```
gcloud auth application-default login
gcloud app deploy server/serverAppEngine.yaml client/clientAppEngine.yaml
```