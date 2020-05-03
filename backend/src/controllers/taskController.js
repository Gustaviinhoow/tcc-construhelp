const db = require("../models/database");

const Task = db.task;

exports.create = (req, res) => {
    const { description, priority, completed, deadline, workspaceId } = req.body;

    return Task.create({
        description: description,
        priority: priority,
        completed: completed ? completed : false,
        deadline: deadline,
        WorkspaceId: workspaceId
    }).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the task."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Task.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Task was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update task with id=${id}`
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: "Error updating task with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete task with id=${id}`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete task with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    return Task.findAll().then(data => {
        res.send(data);
    }).catch(() => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tasks."
        });
    });
};

// GET Task w/ Workspace***
exports.findById = (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    return Task.findByPk(id,
        {
            include: ["workspaces"]
        }).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({
                message: "Error retrieving task with id = " + id
            });
        });
};