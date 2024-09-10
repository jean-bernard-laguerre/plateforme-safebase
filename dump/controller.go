package dump

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/history"
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

	app.Post("/backup", func(ctx *fiber.Ctx) error {
		backup := new(DumpModel)
		if err := ctx.BodyParser(backup); err != nil {
			return createErrorResponse(ctx, 400, "Invalid input")
		}

		connection := connection.ConnectionModel{}
		dbConn, error := connection.GetById(backup.Connection_id)

		if error != nil {
			return createErrorResponse(ctx, 404, "Connection not found")
		}

		var result string
		if dbConn.Db_type == "postgres" {
			result = PostgresDump(backup, &dbConn)
		} else if dbConn.Db_type == "mysql" {
			result = MysqlDump(backup, &dbConn)
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

	app.Post("/restore", func(ctx *fiber.Ctx) error {
		restore := new(history.HistoryModel)
		if err := ctx.BodyParser(restore); err != nil {
			return createErrorResponse(ctx, 400, "Invalid input")
		}
		connection := connection.ConnectionModel{}
		dbConn, error := connection.GetById(restore.Bdd_source)
		if error != nil {
			return createErrorResponse(ctx, 404, "Connection not found")
		}
		var result string
		if dbConn.Db_type == "postgres" {
			result = PostgresRestore(restore, &dbConn)
		} else if dbConn.Db_type == "mysql" {
			result = MysqlRestore(restore, &dbConn)
		} else {
			return createErrorResponse(ctx, 400, "Invalid database type")
		}
		if result != "Restore created successfully" {
			return createErrorResponse(ctx, 500, result)
		}
		return createSuccessResponse(ctx, "Restore created successfully")
	})
}
