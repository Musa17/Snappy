// requiring modules and setting up app and socket.io
const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: "*",
});

const cors = require("cors");

// Requiring mongoose
const mongoose = require("mongoose");

app.use(
  express.urlencoded({
    extended: false,
  })
);

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// To overcome cors error due to usage React on PORT 3000
app.use(cors());

// connecting to mongoDB
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Listening
server.listen(process.env.PORT || 5000, () =>
  console.log("server is running on port 5000")
);
