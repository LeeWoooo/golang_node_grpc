package main

import (
	"crypto/tls"
	"go_app/internal/app"
	"go_app/internal/gen/hello"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

var (
	port    = ":50051"
	crtFile = "/usr/src/app/go_app/devtools/key/ca.crt"
	keyFile = "/usr/src/app/go_app/devtools/key/ca.key"
)

func main() {
	// 1. 공개/개인키 쌍을 읽어 파싱하고 TLS를 사용할 수 있는 인증서를 생성합니다.
	cert, err := tls.LoadX509KeyPair(crtFile, keyFile)
	if err != nil {
		log.Fatalf("failed t olaod key pair: %s", err)
	}

	opt := []grpc.ServerOption{
		grpc.Creds(credentials.NewServerTLSFromCert(&cert)),
	}

	s := grpc.NewServer(opt...)
	hello.RegisterHelloResourceServer(s, app.NewHelloResource())

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		log.Println("starting grpc server with 50051...")
		if err := s.Serve(lis); err != nil {
			log.Panicln("listen grpc error")
		}
	}()

	quit := make(chan os.Signal, 1)
	// kill (no param) default send syscall.SIGTERM
	// kill -2 is syscall.SIGINT
	// kill -9 is syscall.SIGKILL but can't be catch, so don't need add it
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down :50051 server...")

	s.GracefulStop()
}
