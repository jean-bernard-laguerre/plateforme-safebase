package dump

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
)

//DONE 1. Create a route create a backup
//DONE 2. Create a route to get all backups
//DONE 3. Create a route to get a backup by id
//DONE 4. Create a route to delete a backup by id

func createErrorResponse (ctx *fiber.Ctx, statusCode int, message string) error {
	return ctx.Status(statusCode).JSON(fiber.Map{
		"success": false,
		"message": message,
	})
}

func createSuccessResponse (ctx *fiber.Ctx, message string) error {
	return ctx.Status(200).JSON(fiber.Map{
		"success": true,
		"message": message,
	})
}


func AddRoutes(app *fiber.App) {

	/* app.Post( "/backup", func(ctx *fiber.Ctx) error {
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
	}) */

	app.Post("/backup", func(ctx *fiber.Ctx ) error {
		backup := new(DumpModel)
		if err := ctx.BodyParser(backup); err != nil {
			return createErrorResponse(ctx, 400, "Invalid input")
		}

		connection := connection.ConnectionModel{}
		connection = connection.GetById(backup.Connection_id)

		var result string
		if connection.Db_type == "postgres" {
			result = PostgresDump(connection.Db_name)
		} else if connection.Db_type == "mysql" {
			result = MysqlDump(connection.Db_name)
		} else {
			return createErrorResponse(ctx, 400, "Invalid database type")
		}

		if result != "Backup created successfully" {
			return createErrorResponse(ctx, 500, result)
		}

		return createSuccessResponse(ctx, "Backup created successfully")
	})
				

		app.Get("/backups", func(ctx *fiber.Ctx) error {
			backup := new(DumpModel)
			if err := ctx.BodyParser(backup); err != nil {
					return ctx.Status(200).JSON(fiber.Map{
						"success": true,
						"message": "All backups",
					})
				} else {
					return ctx.Status(400).JSON(fiber.Map{
						"success": false,
						"message": "Invalid input",
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

