FROM node:14.17.6-alpine

# move work DIR
WORKDIR /usr/src/app

# NODE
RUN mkdir node_app

WORKDIR /usr/src/app/node_app

# package.json 복사
COPY ./node_app/package.json .

# yarn install
RUN yarn install && yarn global add pm2

# node code 복사
COPY ./node_app .

# build
RUN yarn tsc

EXPOSE 3000


WORKDIR /usr/src/app

# GO Install

RUN apk add --no-cache ca-certificates
ARG GOLANG_VERSION=1.16.5

#we need the go version installed from apk to bootstrap the custom version built from source
RUN apk update && apk add go gcc bash musl-dev openssl-dev ca-certificates && update-ca-certificates

RUN wget https://dl.google.com/go/go$GOLANG_VERSION.src.tar.gz && tar -C /usr/local -xzf go$GOLANG_VERSION.src.tar.gz

RUN cd /usr/local/go/src && ./make.bash

ENV PATH=$PATH:/usr/local/go/bin

RUN rm go$GOLANG_VERSION.src.tar.gz

#we delete the apk installed version to avoid conflict
RUN apk del go

RUN mkdir go_app

WORKDIR /usr/src/app/go_app 

COPY ./go_app .

# dependency 가져오기
RUN go mod tidy && go get -u -d -v ./... 

# build
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags '-s' -o main ./cmd/server/main.go

# Add sh
COPY ./start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]




