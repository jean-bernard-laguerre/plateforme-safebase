FROM golang:1.23.0
WORKDIR /app
COPY . .
RUN go mod download
RUN go get -u github.com/air-verse/air

ENTRYPOINT [ "air" ]