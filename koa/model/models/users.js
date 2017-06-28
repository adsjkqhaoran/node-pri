var db = require('../db');
//定义映射模型
module.exports =  db.define('users', {
    name: {
        type: db.STRING
    },
    age: {
        type: db.INTEGER
    }
});