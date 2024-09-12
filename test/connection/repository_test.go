package connection_test

import (
	"database/sql"
	"testing"

	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
)

func setupTestDB() (*sql.DB, error) {
	config := mysql.Config{
		User:                 "root",
		Passwd:               "",
		Net:                  "tcp",
		Addr:                 "localhost:3306",
		DBName:               "safebase",
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	db, err := sql.Open("mysql", config.FormatDSN())
	if err != nil {
		panic(err)
	}
	return db, nil
}

func TestRepository(t *testing.T) {
	db, err := setupTestDB()
	if err != nil {
		t.Fatalf("setupTestDB failed: %v", err)
	}
	defer db.Close()

	config.DB = db

	t.Run("GetById", func(t *testing.T) {
		conn := connection.ConnectionModel{}
		result, err := conn.GetById(1)
		if err != nil {
			t.Fatalf("GetById failed: %v", err)
		}
		if result.Id != 1 {
			t.Fatalf("GetById failed")
		}
	})

	t.Run("GetByUserId", func(t *testing.T) {
		conn := connection.ConnectionModel{}
		result, err := conn.GetByUserId(1)
		if err != nil {
			t.Fatalf("GetByUserId failed: %v", err)
		}
		if len(result) == 0 {
			t.Fatalf("GetByUserId failed")
		}
	})
}

func TestFailRepository(t *testing.T) {
	db, err := setupTestDB()
	if err != nil {
		t.Fatalf("setupTestDB failed: %v", err)
	}
	defer db.Close()

	config.DB = db

	t.Run("GetById", func(t *testing.T) {
		conn := connection.ConnectionModel{}
		_, err := conn.GetById(100)
		if err == nil {
			t.Fatalf("GetById failed")
		}
	})

	t.Run("GetByUserId", func(t *testing.T) {
		conn := connection.ConnectionModel{}
		_, err := conn.GetByUserId(0)
		if err == nil {
			t.Fatalf("GetByUserId failed")
		}
	})
}
