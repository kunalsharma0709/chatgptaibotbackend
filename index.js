require("dotenv").config();
const express = require("express");
const userrouters = require("../backend/routes/users");
const chatrouters = require("../backend/routes/chat");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/user",userrouters);
app.use("/chat",chatrouters)

app.listen(3000);
