
const Koa = require('koa');
const app = new Koa();
const serverHandle = require('../app');

const port = 3000;

app.use(async (ctx, next) => {
   await serverHandle(ctx,next);
});

app.listen(port);
