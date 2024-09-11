package dump

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
)

func createErrorResponse(ctx *fiber.Ctx, statusCode int, message string) error {
	return ctx.Status(statusCode).JSON(fiber.Map{
		"success": false,
		"message": message,
	})
}

func createSuccessResponse(ctx *fiber.Ctx, message string) error {
	return ctx.Status(200).JSON(fiber.Map{
		"success": true,
		"message": message,
	})
}

func AddRoutes(app *fiber.App) {

	app.Post("/task", func(ctx *fiber.Ctx) error {
		tasks := new(DumpModel)
		if err := ctx.BodyParser(tasks); err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}

		_, err := tasks.Create(tasks.Name, tasks.Cron_job, tasks.Connection_id)
		if err != nil {
			return createErrorResponse(ctx, 500, "Internal server error")
		} else {
			AddCronJob(tasks.Cron_job, tasks.Connection_id)
			return createSuccessResponse(ctx, "Task created successfully")
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
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}
	})

	app.Get("/backup/:id", func(ctx *fiber.Ctx) error {

		id, _ := ctx.ParamsInt("id")

		connection := connection.ConnectionModel{}
		dbConn, error := connection.GetById(id)

		if error != nil {
			return createErrorResponse(ctx, 404, "Connection not found")
		}

		var result string
		if dbConn.Db_type == "postgres" {
			result = PostgresDump(&dbConn)
		} else if dbConn.Db_type == "mysql" {
			result = MysqlDump(&dbConn)
		} else {
			return createErrorResponse(ctx, 400, "Invalid database type")
		}

		if result != "Backup created successfully" {
			return createErrorResponse(ctx, 500, result)
		}

		return createSuccessResponse(ctx, "Backup created successfully")

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
