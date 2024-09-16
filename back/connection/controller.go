package connection

import (
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {

	co := app.Group("/connection")

	co.Post("/test", func(ctx *fiber.Ctx) error {
		conn := new(ConnectionModel)
		if err := ctx.BodyParser(conn); err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		coValid, err := TestConnection(*conn)
		if coValid {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Connection valide",
			})
		} else {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
	})

	co.Post("/", func(ctx *fiber.Ctx) error {
		conn := new(ConnectionModel)
		if err := ctx.BodyParser(conn); err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		id, err := conn.Create(conn.Name, conn.Host, conn.Port, conn.User, conn.Password, conn.Db_name, conn.Db_type, conn.User_id)
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		} else {
			return ctx.Status(201).JSON(fiber.Map{
				"success": true,
				"message": "Connection ajoutée",
				"id":      id,
			})
		}
	})

	co.Get("/user/:userId", func(ctx *fiber.Ctx) error {
		userId, err := ctx.ParamsInt("userId")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		conn := ConnectionModel{}
		connections, err := conn.GetByUserId(userId)
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		return ctx.Status(200).JSON(fiber.Map{
			"success":     true,
			"connections": connections,
		})
	})

	co.Get("/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"error":   err,
			})
		}
		conn := ConnectionModel{}
		connection, err := conn.GetById(id)
		return ctx.Status(200).JSON(fiber.Map{
			"success":    true,
			"connection": connection,
		})
	})
}
