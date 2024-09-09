package main

import (
	"github.com/gofiber/fiber/v2"

	"github.com/jean-bernard-laguerre/plateforme-safebase/src/config"
	"github.com/jean-bernard-laguerre/plateforme-safebase/src/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/src/user"
)

func main() {
	//connect to the database
	config.InitDB()
	defer config.CloseDB()

	// Create a new Fiber instance
	app := fiber.New()

	// Add routes
	user.AddRoutes(app)
	connection.AddRoutes(app)

	// Start server on http://localhost:3000
	app.Listen(":3000")
}
