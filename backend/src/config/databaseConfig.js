module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "toor",
  DB: "construhelp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "-03:00",
};
