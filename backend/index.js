const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./src/models/database');

const app = express();

const port = process.env.port || 8080;
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
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