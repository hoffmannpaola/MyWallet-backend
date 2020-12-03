const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());


const { postSignUp, postSignIn } = require('./src/controllers/usersController');
const authMiddleware = require('./src/middlewares/authMiddleware');
const { getFinances } = require('./src/controllers/financesController');

app.use(cors());

// Sign routes
app.post("/api/sign-up", postSignUp);
app.post("/api/sign-in", postSignIn);

// Finances routes
app.get("/api/finances", getFinances)

module.exports = app;