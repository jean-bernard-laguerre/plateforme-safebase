package connection

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {

	co := app.Group("/connection")

	co.Get("/test/:id", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}
		conn := ConnectionModel{}
		testConn := conn.GetById(id)

		if TestConnection(testConn) {
			return ctx.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "Connection valide",
			})
		} else {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Connection invalide",
			})
		}
	})

	co.Post("/", func(ctx *fiber.Ctx) error {
		conn := new(ConnectionModel)
		if err := ctx.BodyParser(conn); err != nil {
			fmt.Println(err)
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}
		fmt.Println(conn.Db_name)
		if conn.Create(
			conn.Name, conn.Host, conn.Port, conn.User, conn.Password, conn.Db_name, conn.Db_type, conn.User_id,
		) {
			return ctx.Status(201).JSON(fiber.Map{
				"success": true,
				"message": "Connection ajoutée",
			})
		} else {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Connection invalide",
			})
		}
	})

	co.Get("/user/:userId", func(ctx *fiber.Ctx) error {
		userId, err := ctx.ParamsInt("userId")
		if err != nil {
			return ctx.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}
		conn := ConnectionModel{}
		connections := conn.GetByUserId(userId)
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
				"message": "Invalid input",
			})
		}
		conn := ConnectionModel{}
		connection := conn.GetById(id)
		return ctx.Status(200).JSON(fiber.Map{
			"success":    true,
			"connection": connection,
		})
	})
}
