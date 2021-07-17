const  sensor = require('./src/sensor/sensor')
const controller = require('./src/controller')

const serverHandle=async (ctx,next) => {

   await sensor(ctx);
   await controller(ctx)

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }


};
module.exports = serverHandle;
