module.exports = app => {
    const user = require("../controllers/userController");

    var router = require("express").Router();

    router.post("/", user.create);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);
    router.get("/", user.findAll);
    router.get("/:id", user.findById);
    
    app.use("/api/users", router);
};