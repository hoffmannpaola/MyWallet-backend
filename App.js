const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


const { postSignUp, postSignIn, postSignOut } = require('./src/controllers/usersController');
const authMiddleware = require('./src/middlewares/authMiddleware');
const { getFinances, postRegistry } = require('./src/controllers/financesController');



// Sign routes
app.post("/api/sign-up", postSignUp);
app.post("/api/sign-in", postSignIn);
app.post("/api/sign-out", authMiddleware, postSignOut);

// Finances routes
app.get("/api/finances", getFinances);
app.post("/api/register", authMiddleware, postRegistry);

module.exports = app;