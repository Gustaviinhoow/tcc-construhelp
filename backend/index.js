const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/models/database");

const app = express();

const port = process.env.port || 8080;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

database.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Routes
app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

require("./src/routes/userRoute")(app);
require("./src/routes/workspaceRoute")(app);
require("./src/routes/taskRoute")(app);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
