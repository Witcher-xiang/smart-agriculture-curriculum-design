const env = process.env.NODE_ENV; //环境参数

//配置
let MYSQL_CONF,REDIS_CONF;

if (env === "dev"){
    MYSQL_CONF = {
        // host: "101.201.65.247",
        // user: "root",
        // password: "WYXaptx4869.",
        // port:"3306",
        // database:"sensor_database"
        host: "127.0.0.1",
        user: "root",
        password: "123456",
        port:"3306",
        database:"sensor_database"
    };
    REDIS_CONF = {
        port:6379,
        host:"127.0.0.1"
    }
}
if (env === "production") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port:"3306",
        database:"myblog"
    };
    REDIS_CONF = {
        port:6379,
        host:"127.0.0.1"
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
