package main

import (
	"github.com/gofiber/fiber/v2"

	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
	"github.com/jean-bernard-laguerre/plateforme-safebase/user"
)

func main() {
	//connect to the database
	config.InitDB()

	/* co := connection.ConnectionModel{}
	testConn := co.GetById(1)
	connection.TestConnection(testConn) */

	defer config.CloseDB()

	// Create a new Fiber instance
	app := fiber.New()
	user.AddRoutes(app)
	app.Listen(":3000")
}
