package user

import (
	"fmt"
)

func Register(email string, password string) (bool, error) {
	user := UserModel{}
	newUser, err := user.Create(email, password)

	if err != nil {
		fmt.Println(err)
		return false, err
	}

	if newUser == 0 {
		return false, fmt.Errorf("Email already exists")
	} else {
		fmt.Println("User created successfully")
		return true, nil
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
