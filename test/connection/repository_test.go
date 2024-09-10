package connection_test

import (
	"testing"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
)

func TestRepository(t *testing.T) {
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
