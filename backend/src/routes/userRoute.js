module.exports = (app) => {
  const user = require("../controllers/userController");

  var router = require("express").Router();

  const validation = user.validateInfo();

  router.post("/", validation, user.create);
  router.put("/:id", user.update);
  router.delete("/:id", user.delete);
  router.get("/", user.findAll);
  router.get("/:id", user.findById);

  router.post("/login", user.login);

  app.use("/api/users", router);
};
