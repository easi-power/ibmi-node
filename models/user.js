const connection = require('./sequelize-connection').connection;
const Sequelize = require('@sequelize/core');

const User = connection.define('USERS', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING
    }, {
    // Other model options go here
    sequelize: connection, // We need to pass the connection instance
    modelName: 'users', // We need to choose the model name
    timestamps: false,
});

module.exports = User;