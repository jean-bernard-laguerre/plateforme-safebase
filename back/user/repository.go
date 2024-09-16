package user

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
)

func (u *UserModel) Create(
	email string, password string,
) bool {
	validation := u.GetByEmail(email)
	if validation.Email != "" {
		return false
	}
	_, err := config.DB.Exec("INSERT INTO users(email, password) VALUES(?, ?)", email, password)
	if err != nil {
		fmt.Println(err)
		return false
	}

	fmt.Println("User created successfully")
	return true
}

func (u UserModel) GetById(id int) UserModel {
	err := config.DB.QueryRow("SELECT * FROM users WHERE id = ?", id).Scan(
		&u.Id, &u.Email, &u.Password)
	if err != nil {
		fmt.Println(err)
	}
	return u
}

func (u UserModel) GetByEmail(email string) UserModel {
	err := config.DB.QueryRow("SELECT * FROM users WHERE email = ?", email).Scan(
		&u.Id, &u.Email, &u.Password)
	if err != nil {
		fmt.Println(err)
	}
	return u
}

/* func (u *UserModel) GetAll() []UserModel {
	rows, err := config.DB.Query("SELECT * FROM user")
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	users := []UserModel{}

	for rows.Next() {
		var user UserModel
		err := rows.Scan(&user.id, &user.Email, &user.Password)
		if err != nil {
			fmt.Println(err)
		}
		users = append(users, user)
	}

	return users
} */
