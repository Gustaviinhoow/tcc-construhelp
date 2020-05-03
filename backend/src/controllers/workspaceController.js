const db = require("../models/database");

const Workspace = db.workspace;

exports.create = (req, res) => {
    const { name, userId } = req.body;

    return Workspace.create({
        name: name,
        UserId: userId
    }).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the workspace."
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

    Workspace.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Workspace was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update workspace with id=${id}`
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: "Error updating workspace with id=" + id
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

    Workspace.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Workspace was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete workspace with id=${id}`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete workspace with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    return Workspace.findAll().then(data => {
        res.send(data);
    }).catch(() => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving workspaces."
        });
    });
};

// GET Workspace w/ User & Tasks***
exports.findById = (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    return Workspace.findByPk(id,
        {
            include: ["user", "tasks"]
        }).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({
                message: "Error retrieving workspace with id = " + id
            });
        });
};