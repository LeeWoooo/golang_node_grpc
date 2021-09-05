// GENERATED CODE -- DO NOT EDIT!

// package: hello
// file: hello.proto

import * as hello_pb from './hello_pb';
import * as grpc from '@grpc/grpc-js';

interface IHelloResourceService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  say_hello: grpc.MethodDefinition<
    hello_pb.SayHelloRequest,
    hello_pb.SayHelloResponse
  >;
}

export const HelloResourceService: IHelloResourceService;

export interface IHelloResourceServer
  extends grpc.UntypedServiceImplementation {
  say_hello: grpc.handleUnaryCall<
    hello_pb.SayHelloRequest,
    hello_pb.SayHelloResponse
  >;
}

export class HelloResourceClient extends grpc.Client {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  );
  say_hello(
    argument: hello_pb.SayHelloRequest,
    callback: grpc.requestCallback<hello_pb.SayHelloResponse>
  ): grpc.ClientUnaryCall;
  say_hello(
    argument: hello_pb.SayHelloRequest,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<hello_pb.SayHelloResponse>
  ): grpc.ClientUnaryCall;
  say_hello(
    argument: hello_pb.SayHelloRequest,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<hello_pb.SayHelloResponse>
  ): grpc.ClientUnaryCall;
}
