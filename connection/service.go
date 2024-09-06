package connection

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
)

func TestConnection(c ConnectionModel) bool {
	if c.Db_type == "mysql" {
		return TestConnectionMySql(c)
	} else if c.Db_type == "postgres" {
		return TestConnectionPostgres(c)
	}
	return false
}

func TestConnectionMySql(c ConnectionModel) bool {
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
		fmt.Println("Invalid Connection:", c.Db_type, fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name, err)
		return false
	}
	fmt.Println("Valid Connection:", c.Db_type, fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name)

	defer db.Close()
	return true
}

func TestConnectionPostgres(c ConnectionModel) bool {
	connString := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s", c.User, c.Password, c.Host, c.Port, c.Db_name)
	db, err := sql.Open(c.Db_type, connString)
	if err != nil {
		fmt.Println("Invalid Connection:", c.Db_type, fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name, err)
		return false
	}
	fmt.Println("Valid Connection:", c.Db_type, fmt.Sprintf("%s:%s", c.Host, c.Port), c.Db_name)
	defer db.Close()
	return true
}
