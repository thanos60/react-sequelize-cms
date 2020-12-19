const Sequelize = require('sequelize')
const sequelize = require('../db')

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        defaultValue: '1',
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true,
        foreignKey: true,
    }
}, { timestamps: false, freezeTableName: true })

module.exports = Post