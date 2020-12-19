const Sequelize = require('sequelize')

const sequelize = new Sequelize('cms', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize