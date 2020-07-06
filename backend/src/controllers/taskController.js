const db = require("../models/database");

const Task = db.task;
const Workspace = db.workspace;

exports.create = (req, res) => {
  const {
    title,
    description,
    priority,
    completed,
    deadline,
    workspaceId,
    userId,
  } = req.body;

  return Task.create({
    title: title,
    description: description,
    priority: priority,
    completed: completed ? completed : false,
    deadline: deadline,
    WorkspaceId: workspaceId,
    UserId: userId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the task.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Task.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating task with id=" + id,
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

  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete task with id=${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete task with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  return Task.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// GET Task w/ Workspace***
exports.findById = (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  return Task.findByPk(id, {
    include: ["workspaces"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving task with id = " + id,
      });
    });
};

exports.list = (req, res) => {
  const { workspaceId } = req.body;

  if (workspaceId === undefined || workspaceId === null) {
    res.status(400).send({
      message: `Content can not be empty! id: ${workspaceId}`,
    });
    return;
  }

  return Task.findAll({ where: { workspaceId: workspaceId, completed: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error while searching data, id: ${workspaceId}`,
      });
    });
};

exports.listCompleted = (req, res) => {
  const { workspaceId } = req.body;

  if (workspaceId === undefined || workspaceId === null) {
    res.status(400).send({
      message: `Content can not be empty! id: ${workspaceId}`,
    });
    return;
  }

  return Task.findAll({ where: { workspaceId: workspaceId, completed: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error while searching data, id: ${workspaceId}`,
      });
    });
};

exports.markascompleted = (req, res) => {
  const id = req.body.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Task.update(
    { completed: true },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task marked as completed successfully.",
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating task with id=" + id,
      });
    });
};

exports.tasksPriority = (req, res) => {
  const { priority, id } = req.body;

  if (priority === undefined || priority === null) {
    res.status(400).send({
      message: `Content can not be empty! content: ${priority}`,
    });
    return;
  }

  Task.findAll({
    where: { priority: priority, completed: false, userId: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error while searching data: ${error}`,
      });
    });
};
