module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(320),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(32),
            allowNull: false
        }
    }, {
        tableName: "Users"
    });

    return User;
};