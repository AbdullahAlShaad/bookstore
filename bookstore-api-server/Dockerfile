# syntax=docker/dockerfile:1

# Base Image
FROM golang:1.24-alpine AS build  

# Default destination for all subsequent command
# Directory inside the image
WORKDIR /app

# Copy dependencies into the image
COPY go.mod ./
COPY go.sum ./

#download dependencies in the image
RUN go mod download 

#copy all the .go files in the image
COPY . ./ 

# Building the binary
RUN go build -o /bookstore-api-server .

##
## Deploy
##
FROM alpine:latest

WORKDIR /

COPY --from=build /bookstore-api-server /bookstore-api-server

EXPOSE 8081

CMD ["/bookstore-api-server"]


# apk add bash

