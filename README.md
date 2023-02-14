
# Telechat

Realtime private chat application based on Firebase Firestore. The application supports sending text messages and images between two parties. In this web application, context API is used to share & toggle states among different components. 


## Run Locally

Clone the project

```bash
  git clone https://github.com/PriyanshuSharma0326/telechat.git
```

Go to the project directory

```bash
  cd telechat/
```

Install dependencies

```bash
  npm i @reduxjs/toolkit
  npm i @emotion/react @emotion/styled
  npm i @mui/icons-material @mui/material
  npm i firebase
  npm i react
  npm i react react-dom
  npm i react-firebase-hooks
  npm i react-redux
  npm i react-router-dom
  npm i react-scripts
  npm i styled-components
  npm i uuid
  npm i web-vitals
```

Start the server

```bash
  npm start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_KEY=YOUR_API_KEY`

`REACT_APP_AUTH_DOMAIN=YOUR_AUTH_DOMAIN`

`REACT_APP_PROJECT_ID=YOUR_PROJECT_ID`

`REACT_APP_STORAGE_BUCKET=YOUR_STORAGE_BUCKET`

`REACT_APP_SENDER_ID=YOUR_SENDER_ID`

`REACT_APP_APP_ID=YOUR_APP_ID`


## Tech Stack

**Client:** React, contextAPI, MaterialUI, styled-components

**Server:** Firestore, Google Auth


## Deployment

Deploy this project on Vercel.