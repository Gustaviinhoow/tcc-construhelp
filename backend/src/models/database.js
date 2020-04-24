const dbConfig = require('../config/databaseConfig');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

async function tryConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
tryConnection();

// Associations
const User = require("./userModel")(sequelize, Sequelize);
const Workspace = require("./workspaceModel")(sequelize, Sequelize);
const Task = require("./taskModel")(sequelize, Sequelize);

// User has many workspaces & workspace belongs to one user
User.hasMany(Workspace);
Workspace.belongsTo(User);

// User has many workspaces & workspace belongs to one user
Workspace.hasMany(Task);
Task.belongsTo(Workspace);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.workspace = Workspace;
db.task = Task;

module.exports = db;