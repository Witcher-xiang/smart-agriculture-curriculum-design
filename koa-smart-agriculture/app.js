const  sensor = require('./src/sensor/sensor')

const serverHandle=async (ctx,next) => {
    console.log( sensor(ctx))
   await sensor(ctx);

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }

    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
//     console.log("NODE_ENV_IS");
//     console.log("完整的URL请求",ctx.request.query);
//     console.log(ctx.request)
};
module.exports = serverHandle;
