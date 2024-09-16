package user

import (
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {

	app.Get("/testApi", func(ctx *fiber.Ctx) error {
		return ctx.Status(200).JSON(fiber.Map{
			"success": true,
			"message": "Api bien créée",
		})
	})

	app.Post("/register", func(c *fiber.Ctx) error {
		user := new(UserModel)
		if err := c.BodyParser(user); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}

		if Register(user.Email, user.Password) {
			return c.Status(200).JSON(fiber.Map{
				"success": true,
				"message": "User created successfully",
			})
		} else {
			// return c.Status(400).JSON(fiber.Map{
			// 	"success": false,
			// 	"message": "User already exists",
			// })
			return fiber.NewError(fiber.StatusConflict, "User already exists")
		}
	})

	app.Post("/login", func(c *fiber.Ctx) error {
		user := new(UserModel)
		if err := c.BodyParser(user); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid input",
			})
		}

		u, err := Login(user.Email, user.Password)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"success": false,
				"message": err.Error(),
			})
		}

		return c.Status(200).JSON(fiber.Map{
			"success": true,
			"message": "User logged in",
			"user":    u,
		})
	})
}
