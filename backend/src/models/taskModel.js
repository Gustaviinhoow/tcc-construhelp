module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("Task", {
        description: {
            type: Sequelize.TEXT('tiny'),
            allowNull: false
        },
        priority: {
            type: Sequelize.STRING,
            defaultValue: "Normal"
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        deadline: {
            type: Sequelize.DATE
        }
    }, {
        tableName: "Tasks"
    });

    return Task;
};