const db = require("../models/database");

const User = db.user;

exports.create = (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    return User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }).then(data => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the user."
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

    User.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update user with id=${id}`
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: "Error updating user with id=" + id
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

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    return User.findAll().then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    return User.findByPk(id,
        ).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({
                message: "Error retrieving user with id = " + id
            });
        });
};