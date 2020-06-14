module.exports = (app) => {
  const workspace = require("../controllers/workspaceController");

  var router = require("express").Router();

  router.post("/", workspace.create);
  router.put("/:id", workspace.update);
  router.delete("/:id", workspace.delete);
  router.get("/", workspace.findAll);
  router.get("/:id", workspace.findById);

  app.use("/api/workspaces", router);
};
