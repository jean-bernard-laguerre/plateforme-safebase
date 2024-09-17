package history

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
)

func AddRoutes(app *fiber.App) {

	hy := app.Group("/history")

	hy.Get("/all", func(ctx *fiber.Ctx) error {
		history := HistoryModel{}
		histories, err := history.GetAll()
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		return ctx.Status(200).JSON(fiber.Map{
			"histories": histories,
		})
	})

	hy.Get("/user/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")

		// get the page and limit from the query or set a default
		var params config.ParamsHandler
		params.Init()

		if err := ctx.QueryParser(&params); err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		history := HistoryModel{}
		histories, err := history.GetByUserId(id, params.Page, params.Limit)
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		return ctx.Status(200).JSON(fiber.Map{
			"histories": histories,
		})
	})
}
