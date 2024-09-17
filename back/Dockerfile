FROM golang:1.23.0
WORKDIR /app

COPY . .

RUN go mod download && go mod verify

RUN go install github.com/air-verse/air@latest

EXPOSE 8000

ENTRYPOINT [ "air" ]