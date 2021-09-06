import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { SayHelloRequest } from './gen/hello_pb';
import { helloResourceClient } from './app/hello';

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

// grpc with tls
router.get('/grpc/tls', async ctx => {
  console.log("tls 요청이 들어옴");
  
  const hr = new SayHelloRequest();
  hr.setSendmessage("tls test message");

  console.log("request 만들어짐");

  try {
    console.log("요청함");
    const resp = await helloResourceClient.SayHello(hr)
    console.log(resp.getReceivedmessage());
    ctx.body = resp.getReceivedmessage();
    console.log("성공");
  }catch(err){
    console.log("실패");
    console.log(err);
    ctx.body = err;
  };
});

// register routers
app.use(router.routes());

// start server
app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`);
});