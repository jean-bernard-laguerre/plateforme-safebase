package history

import (
	"time"
)

type HistoryModel struct {
	Id         int
	Name       string
	Status     bool
	Action     string
	Created_at time.Time
	Bdd_source int
	Bdd_target *int
}
