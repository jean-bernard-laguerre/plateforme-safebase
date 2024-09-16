package main

import (
	"github.com/gofiber/fiber/v2"

	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/dump"
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

	//Add Backup routes
	dump.AddRoutes(app)

	// Start cronjob
	dump.InitCron()

	// Allow CORS
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Set("Access-Control-Allow-Headers", "Content-Type")
		return c.Next()
	})

	
	// Start server on http://localhost:3000
	app.Listen(":3000")
}
