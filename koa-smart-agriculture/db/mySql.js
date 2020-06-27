const mysql = require("mysql");
const {MYSQL_CONF} = require("./config");

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始连接
con.connect();

//统一执行sql函数
function exec(sql) {
    const promise = new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if (err){
                reject(err)
                return
            }
            resolve(result)
        })
    });
    return promise
}
// 不要写con.end 就像一个单例模式

module.exports = {
    exec,
    escape:mysql.escape
};

