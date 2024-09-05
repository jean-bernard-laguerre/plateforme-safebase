package connection

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func TestConnection(c ConnectionModel) bool {
	config := mysql.Config{
		User:   c.User,
		Passwd: c.Password,
		Net:    "tcp",
		Addr:   fmt.Sprintf("%s:%s", c.Host, c.Port),
		DBName: c.Db_name,
	}

	db, err := sql.Open(c.Db_type, config.FormatDSN())

	err = db.Ping()
	if err != nil {
		fmt.Println("Invalid Connection:", fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name)
		fmt.Println(err)
		return false
	}
	fmt.Println("Valid Connection:", fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name)

	defer db.Close()
	return true
}
