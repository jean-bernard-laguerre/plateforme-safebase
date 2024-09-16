package dump

import (
	"github.com/gofiber/fiber/v2"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
)

type updateDTO struct {
	Active bool `json:"active"`
}

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

	du := app.Group("/dump")

	du.Post("/task", func(ctx *fiber.Ctx) error {
		tasks := new(DumpModel)
		if err := ctx.BodyParser(tasks); err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}

		id, err := tasks.Create(tasks.Name, tasks.Cron_job, tasks.Connection_id)
		if err != nil {
			return createErrorResponse(ctx, 500, "Internal server error")
		} else {
			AddCronJob(tasks.Cron_job, tasks.Connection_id, id)
			return createSuccessResponse(ctx, "Task created successfully")
		}

	})

	// du.Get("/task/:id", func(ctx *fiber.Ctx) error {
	// 	id, err := ctx.ParamsInt("id")
	// 	if err != nil {
	// 		return createErrorResponse(ctx, 400, "Invalid input")
	// 	}
	// 	RemoveCronJob(id)
	// 	return createSuccessResponse(ctx, "Task paused successfully")
	// })

	du.Patch("/task/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return createErrorResponse(ctx, 400, "Invalid input"+err.Error())
		}
		tasks := new(DumpModel)
		dto := new(updateDTO)
		if err := ctx.BodyParser(dto); err != nil {
			return createErrorResponse(ctx, 400, "Parse error")
		}
		task, taskErr := tasks.GetById(id)
		if taskErr != nil {
			return createErrorResponse(ctx, 404, "Task not found")
		}

		_, updateErr := task.Update(id, dto.Active)
		if updateErr != nil {
			return createErrorResponse(ctx, 500, "Internal server error")
		}
		if dto.Active {
			AddCronJob(task.Cron_job, task.Connection_id, id)
			return createSuccessResponse(ctx, "Task updated successfully")
		} else {
			RemoveCronJob(id)
			return createSuccessResponse(ctx, "Task paused successfully")
		}
	})

	du.Get("/", func(ctx *fiber.Ctx) error {
		backup := new(DumpModel)
		backups, err := backup.GetAll()

		if err != nil {
			return fiber.NewError(500, "Internal server error")
		}

		return ctx.Status(200).JSON(fiber.Map{
			"data": backups,
		})
	})

	du.Get("/run/:id", func(ctx *fiber.Ctx) error {

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

	du.Delete("/:id", func(ctx *fiber.Ctx) error {
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
