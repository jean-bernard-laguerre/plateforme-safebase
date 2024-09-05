package user

import (
	"fmt"
)

func Register(email string, password string) bool {
	user := UserModel{}
	if user.Create(email, password) {
		return true
	} else {
		return false
	}
}

func Login(email string, password string) {
	user := UserModel{}
	user = user.GetByEmail(email)

	if user.Email == "" {
		fmt.Println("Email does not exist")
		return
	} else if user.Password != password {
		fmt.Println("Incorrect password")
		return
	}

	fmt.Println("Login successful")
}
