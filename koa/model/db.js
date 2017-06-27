var mySql = require('mysql2'); //驱动库
var Sequelize = require('sequelize'); //映射数据为对象库
var config = {
    database: 'text', // 使用哪个数据库
    username: 'root', // 用户名
    password: '123456', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var define = (tables, attrs) => {
    //添加id
    attrs.id = {
        type: Sequelize.BIGINT,
        primaryKey: true
    };
    //添加timestamps
    return sequelize.define(tables, attrs, {
        timestamps: true
    });
}
var exp = {
    define: define,
    sycn : () => {
        sequelize.sync({
            force: true
        })
    }
};
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for (let type of TYPES) {
    exp[type] = Sequelize[type];
}
module.exports = exp;