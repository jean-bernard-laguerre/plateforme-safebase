package dump

import (
	"github.com/gofiber/fiber/v2"
)

//DONE 1. Create a route create a backup
//DONE 2. Create a route to get all backups
//TODO 3. Create a route to get a backup by id
//TODO 4. Create a route to delete a backup by id

func AddRoutes(app *fiber.App) {

	app.Post( "/backup", func(ctx *fiber.Ctx) error {
		backup := new(DumpModel)
		if err := ctx.BodyParser(backup); err != nil {
		return ctx.Status(200).JSON(fiber.Map{
			"success": false,
			"message": err.Error(),
			})
		} else {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Backup created successfully",
			})
		}
	})


		app.Get("/backups", func(ctx *fiber.Ctx) error {
			backup := new(DumpModel)
			if err := ctx.BodyParser(backup); err != nil {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "All backups",
			})
		} else {
			return ctx.Status(200).JSON(fiber.Map{
				"success": false,
				"message": err.Error(),
			})
		}
	})


	app.Get("/backup/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		} else {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Backup found" + string(id),
			})
		}
	})


	app.Delete("/backup/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		} else {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Backup deleted successfully" + string(id),
			})
		}
	})

}

