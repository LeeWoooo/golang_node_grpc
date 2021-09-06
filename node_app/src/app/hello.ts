import { ChannelCredentials, credentials, ServiceError } from "@grpc/grpc-js";
import { readFileSync } from "fs";
import { HelloResourceClient } from "../gen/hello_grpc_pb";
import { SayHelloRequest, SayHelloResponse } from "../gen/hello_pb";

class HelloResource {
  private client : HelloResourceClient
  private cred : ChannelCredentials

  constructor(){
    const rootCrt = readFileSync('./src/key/ca.crt')
    this.cred = credentials.createSsl(rootCrt)
    const grpcURL = 'localhost:50051';
    this.client = new HelloResourceClient(grpcURL, this.cred,{})
  }

  SayHello(req: SayHelloRequest): Promise<SayHelloResponse> {
    return new Promise((resolve, reject) => {
      this.client.say_hello(req,(err: ServiceError | null, resp?: SayHelloResponse) => {
        // error check
        if (err) {
          return reject(err);
        }

        // null check
        if (!resp) {
          return reject('resp가 존재하지 않음');
        }

        // success
        return resolve(resp);
      });
    });
  };
}

export const helloResourceClient = new HelloResource();
