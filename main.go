package main

import "github.com/gofiber/fiber/v2"

func main() {
	//create an instance of fiber
	app:= fiber.New()
	//create an httphandler
	app.Get("/testApi", func (ctx *fiber.Ctx) error  {
		return ctx.Status(200).JSON(fiber.Map{
			"success": true,
			"message": "Api bien créée",
		})
		
	})
	// listen on port
	app.Listen(":3000")
}