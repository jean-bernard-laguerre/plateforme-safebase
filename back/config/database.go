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
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	DB, err = sql.Open("mysql", config.FormatDSN())
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Connected to: ", fmt.Sprintf("%s:%s", config.Addr, config.DBName))

	err = SetupDatabase()
	if err != nil {
		fmt.Println(err)
	}
}

func CloseDB() {
	DB.Close()
	fmt.Println("Closed database connection")
}

func SetupDatabase() error {

	// Create the database
	_, err := DB.Exec("CREATE DATABASE IF NOT EXISTS safebase")
	if err != nil {
		return err
	} else {
		fmt.Println("Database safebase created")
	}

	// Use the database
	_, err = DB.Exec("USE safebase")
	if err != nil {
		return err
	} else {
		fmt.Println("Using database safebase")
	}

	// Create the user table
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS user (
		id INT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL
	)`)

	if err != nil {
		return err
	} else {
		fmt.Println("Table user created")
	}

	// Create the connection table
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS connection (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		host VARCHAR(255) NOT NULL,
		port VARCHAR(255) NOT NULL,
		user VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		db_name VARCHAR(255) NOT NULL,
		db_type VARCHAR(255) NOT NULL,
		user_id INT NOT NULL,
		FOREIGN KEY (user_id) REFERENCES user(id)
	)`)
	if err != nil {
		return err
	} else {
		fmt.Println("Table connection created")
	}

	// Create the backup table
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS backup (	
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		cron_job VARCHAR(255) NOT NULL,
		connection_id INT NOT NULL,
		created_at DATETIME NOT NULL,
		active BOOLEAN NOT NULL,
		FOREIGN KEY (connection_id) REFERENCES connection(id)
	)`)
	if err != nil {
		return err
	} else {
		fmt.Println("Table backup created")
	}

	// Create the history table
	_, err = DB.Exec(`CREATE TABLE IF NOT EXISTS history (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		status BOOLEAN NOT NULL,
		action VARCHAR(255) NOT NULL,
		created_at DATETIME NOT NULL,
		bdd_source INT NOT NULL,
		bdd_target INT,
		FOREIGN KEY (bdd_source) REFERENCES connection(id),
		FOREIGN KEY (bdd_target) REFERENCES connection(id)
	)`)
	if err != nil {
		return err
	} else {
		fmt.Println("Table history created")
	}

	return nil
}
