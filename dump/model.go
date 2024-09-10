package dump

import "cloud.google.com/go/civil"


type DumpModel struct {
	Id	   int
	Name	 string
	Cron_job  *string
	Connection_id int
	Created_at civil.DateTime
}

