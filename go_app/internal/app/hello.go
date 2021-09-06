package app

import (
	"context"
	pb "go_app/internal/gen/hello"
)

// HelloResourceImpl implement HelloResource
type HelloResourceImpl struct {
	pb.UnimplementedHelloResourceServer
}

// NewHelloResource create HelloResource instance
func NewHelloResource() pb.HelloResourceServer {
	return &HelloResourceImpl{}
}

// SayHello implement HelloResource SayHello
func (h *HelloResourceImpl) SayHello(ctx context.Context, hr *pb.SayHelloRequest) (*pb.SayHelloResponse, error) {
	message := hr.GetSendMessage()
	return &pb.SayHelloResponse{ReceivedMessage: message}, nil
}
