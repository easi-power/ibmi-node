const Sequelize = require('@sequelize/core');
// https://sequelize.org/v3/api/sequelize/
let sequelize = new Sequelize({
    odbcConnectionString: `DRIVER=IBM i Access ODBC Driver;UID=${process.env.DB_USERNAME};PWD=${process.env.DB_PASSWORD};
    SYSTEM=${process.env.DB_HOST};DBQ=${process.env.DB_SCHEMA};`,
    database: process.env.DB_DATABASE,
    dialect: 'ibmi',
    protocol: 'TCP/IP',
    operatorsAliases: 0,
    quoteIdentifiers: false,
    pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.options.define.freezeTableName = true;
sequelize.options.define.underscored = true;
sequelize.options.define.underscoredAll = true;

module.exports.connection = sequelize;