const db = require("../models/database");
const { check, validationResult } = require("express-validator");

const User = db.user;

exports.validateInfo = () => {
  return [
    check("email").isEmail().isLength({ max: 320 }),

    check("password").isLength({ min: 8, max: 32 }),
    check("firstName").isString().isLength({ max: 45 }),
    check("lastName").isString().isLength({ max: 45 }),
  ];
};

exports.create = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
      .then((data) => {
        res.send(data);
      })
      .catch(db.Sequelize.ValidationError, function (err) {
        return res.status(422).send(err.errors);
      })
      .catch(function (err) {
        return res.status(400).send({
          message: err.message,
        });
      });
  } else {
    return res.status(422).json({ errors: errors.array() });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  return User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  return User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving user with id = " + id,
      });
    });
};
