const express = require('express');
const cors = require("cors");
const app = express();

const connection = require('./src/database/index');

const { postSignUp, postSignIn } = require('./src/controllers/usersController');
const authMiddleware = require('./src/middlewares/authMiddleware');

app.use(cors());

// Sign routes
app.post("/mywallet/sign-up", postSignUp);
app.post("/mywallet/sign-in", postSignIn);


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});