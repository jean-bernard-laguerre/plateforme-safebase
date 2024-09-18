package config

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	var err error

	config := mysql.Config{
		User:                 "root",
		Passwd:               "verysecure",
		Net:                  "tcp",
		Addr:                 "mysql:3306",
		DBName:               "safebase",
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	DB, err = sql.Open("mysql", config.FormatDSN())
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Connected to: ", fmt.Sprintf("%s:%s", config.Addr, config.DBName))
}

func CloseDB() {
	DB.Close()
	fmt.Println("Closed database connection")
}
