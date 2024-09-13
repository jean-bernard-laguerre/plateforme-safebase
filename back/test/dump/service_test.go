package dump_test

import (
	"testing"

	"github.com/jean-bernard-laguerre/plateforme-safebase/dump"
)

func TestDumpService(t *testing.T) {
	t.Run("SaveHistory", func(t *testing.T) {
		result, err := dump.SaveHistory("test", true, "test", "test", 1, nil)
		if err != nil {
			t.Fatalf("SaveHistory failed: %v", err)
		}
		if result != true {
			t.Fatalf("SaveHistory failed")
		}
	})
}
