import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

// create app
const app = new Koa();
const port = 3000;

// register bodyParser
app.use(bodyParser());

// create Router
const router = new Router();

// add index page
router.get('/', ctx => {
  ctx.body = 'Hello Koa App';
});

// register routers
app.use(router.routes());

// start server
app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`);
});