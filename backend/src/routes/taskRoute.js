module.exports = (app) => {
  const task = require("../controllers/taskController");

  var router = require("express").Router();

  router.post("/", task.create);
  router.put("/:id", task.update);
  router.delete("/:id", task.delete);
  router.get("/", task.findAll);
  router.get("/:id", task.findById);

  router.post("/list", task.list);
  router.post("/listCompleted", task.listCompleted);
  router.post("/markascompleted", task.markascompleted);

  app.use("/api/tasks", router);
};
