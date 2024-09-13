package history

import (
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {

	hy := app.Group("/history")

	hy.Get("/all", func(ctx *fiber.Ctx) error {
		history := new(HistoryModel)
		histories, err := history.GetAll()
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error": err,
			})
		}
		return ctx.Status(200).JSON(fiber.Map{
			"success": true,
			"histories": histories,
		})
	})
}