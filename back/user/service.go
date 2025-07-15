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
		return true, nil
	}
}

func Login(email string, password string) (UserModel, error) {
	user := UserModel{}
	user, err := user.GetByEmail(email)

	if err != nil {
		fmt.Println("Erreur lors de la connexion:", err)
		return UserModel{}, fmt.Errorf("Email does not exist")
	}

	if user.Password != password {
		fmt.Println("Mot de passe incorrect")
		return user, fmt.Errorf("Incorrect password")
	}

	return user, nil
}
