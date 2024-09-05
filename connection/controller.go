package connection

import (
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {
	app.Get("connection/test/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}
		conn := ConnectionModel{}
		testConn := conn.GetById(id)
		if !TestConnection(testConn) {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Connection testée",
			})
		} else {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Connection invalide",
			})
		}
	})
}
