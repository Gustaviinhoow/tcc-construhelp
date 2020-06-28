module.exports = (sequelize, Sequelize) => {
  const Workspace = sequelize.define(
    "Workspace",
    {
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Workspaces",
    }
  );

  return Workspace;
};
