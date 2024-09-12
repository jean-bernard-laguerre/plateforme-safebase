package history

import (
	"cloud.google.com/go/civil"
)

type HistoryModel struct {
	Id	   int
	Name	 string
	Status bool
	Action string
	Created_at civil.DateTime
	Bdd_source int
	Bdd_target *int
}


