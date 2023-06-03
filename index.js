const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/users.routes");
const { Addrouter } = require("./routes/ads.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend of Mock 8");
});

app.use(UserRouter);
app.use(Addrouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log(`Listening on port ${process.env.PORT} and connected to DB`);
});
