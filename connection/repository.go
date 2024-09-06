package connection

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
)

func (c *ConnectionModel) Create(
	name string, host string, port string, user string, password string, db_name string, db_type string, user_id int,
) bool {
	_, err := config.DB.Exec("INSERT INTO connection (name, host, port, user, password, db_name, db_type, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", name, host, port, user, password, db_name, db_type, user_id)
	if err != nil {
		fmt.Println(err)
		return false
	}

	fmt.Println("Connection created")
	return true
}

func (c ConnectionModel) GetById(id int) ConnectionModel {
	err := config.DB.QueryRow("SELECT * FROM connection WHERE id = ?", id).Scan(
		&c.Id, &c.Name, &c.Host, &c.Port, &c.User, &c.Password, &c.Db_name, &c.Db_type, &c.User_id)
	if err != nil {
		fmt.Println(err)
	}
	return c
}

func (c ConnectionModel) GetByUserId(userId int) []ConnectionModel {
	rows, err := config.DB.Query("SELECT * FROM connection WHERE user_id = ?", userId)
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	connections := []ConnectionModel{}

	for rows.Next() {
		var co ConnectionModel
		err := rows.Scan(&co.Id, &co.Name, &co.Host, &co.Port, &co.User, &co.Password, &co.Db_name, &co.Db_type, &co.User_id)
		if err != nil {
			fmt.Println(err)
		}
		connections = append(connections, co)
	}

	return connections
}

func (c ConnectionModel) Delete(id int) bool {
	_, err := config.DB.Exec("DELETE FROM connection WHERE id = ?", id)
	if err != nil {
		fmt.Println(err)
		return false
	}

	fmt.Println("Connection deleted")
	return true
}
