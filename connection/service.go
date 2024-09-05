package connection

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func TestConnection(c ConnectionModel) bool {
	config := mysql.Config{
		User:   c.user,
		Passwd: c.password,
		Net:    "tcp",
		Addr:   fmt.Sprintf("%s:%s", c.host, c.port),
		DBName: c.db_name,
	}

	db, err := sql.Open(c.db_type, config.FormatDSN())

	err = db.Ping()
	if err != nil {
		fmt.Println("Invalid Connection:", fmt.Sprintf("%s:%s", c.host, c.port), c.db_name)
		fmt.Println(err)
		return false
	}
	fmt.Println("Valid Connection:", fmt.Sprintf("%s:%s", c.host, c.port), c.db_name)

	defer db.Close()
	return true
}
