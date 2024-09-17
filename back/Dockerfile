FROM golang:1.23.0
WORKDIR /app
COPY . .
RUN go mod download && go get -u github.com/cosmtrek/air

ENTRYPOINT [ "air" ]