module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "Task",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT("tiny"),
      },
      priority: {
        type: Sequelize.STRING,
        defaultValue: "Normal",
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deadline: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "Tasks",
    }
  );

  return Task;
};
