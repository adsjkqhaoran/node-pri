var Koa = require('koa');
var mySql = require('mysql2');//驱动库
var Sequelize = require('sequelize');//映射数据为对象库
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

//定义映射模型
var Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

(async() => {
    //增加
    var insert = await Users.create({
        name : 'hx'+ Math.random(),
        age : Math.random()
    });
    console.log(JSON.stringify(insert));
    //查询
    var results = await Users.findAll({
        where: {
            name:{
                '$like' :'hx%'
            }
        }
    });
    //修改
    for (let p of results) {
        console.log(p.name);
        p.name = p.name+'%';
        await p.save();
    }
    //删除
    //  for (let p of results) {
    //     await p.destroy();
    // }
})();