package main

import (
	"github.com/gofiber/fiber/v2"

	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/dump"
	"github.com/jean-bernard-laguerre/plateforme-safebase/history"
	"github.com/jean-bernard-laguerre/plateforme-safebase/user"
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
	dump.AddRoutes(app)
	history.AddRoutes(app)

	// Start cronjob
	dump.InitCron()

	// Start server on http://localhost:3000
	app.Listen(":3000")
}
