module.exports = app => {
    const task = require("../controllers/taskController");

    var router = require("express").Router();

    router.post("/", task.create);
    router.put("/:id", task.update);
    router.delete("/:id", task.delete);
    router.get("/", task.findAll);
    router.get("/:id", task.findById);

    app.use("/api/tasks", router);
};