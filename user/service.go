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

func Login(email string, password string) (UserModel, error) {
	user := UserModel{}
	user = user.GetByEmail(email)

	if user.Email == "" {
		fmt.Println("Email does not exist")
		return user, fmt.Errorf("Email does not exist")

	} else if user.Password != password {
		fmt.Println("Incorrect password")
		return user, fmt.Errorf("Incorrect password")

	}

	fmt.Println("Login successful")
	return user, nil
}
