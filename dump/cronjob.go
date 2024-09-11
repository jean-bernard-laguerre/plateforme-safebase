package dump

import (
	"fmt"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/robfig/cron/v3"
)

var Cr *cron.Cron
var cronList = make(map[int]cron.EntryID)

func InitCron() {
	fmt.Print("Cron job started")
	dumpModel := DumpModel{}
	dumps, err := dumpModel.GetAll()
	if err != nil {
		fmt.Print(err)
	}

	Cr = cron.New()
	for _, d := range dumps {
		id, _ := Cr.AddFunc(d.Cron_job, func() {
			connection := connection.ConnectionModel{}
			dbConn, error := connection.GetById(d.Connection_id)
			if error != nil {
				fmt.Print(error)
			}
			var result string
			if dbConn.Db_type == "postgres" {
				result = PostgresDump(&dbConn)
			} else if dbConn.Db_type == "mysql" {
				result = MysqlDump(&dbConn)
			} else {
				fmt.Print("Invalid database type")
			}
			fmt.Print(result)
		})
		cronList[d.Id] = id
	}
	fmt.Print(cronList)
	Cr.Start()

}

func AddCronJob(cronJob string, co_id int, id int) {
	connection := connection.ConnectionModel{}
	dbConn, error := connection.GetById(co_id)
	if error != nil {
		fmt.Print(error)
	}

	cronID, _ := Cr.AddFunc(cronJob, func() {
		var result string
		if dbConn.Db_type == "postgres" {
			result = PostgresDump(&dbConn)
		} else if dbConn.Db_type == "mysql" {
			result = MysqlDump(&dbConn)
		} else {
			fmt.Print("Invalid database type")
		}
		fmt.Print(result)
	})
	cronList[int(id)] = cronID

}

func RemoveCronJob(id int) {
	Cr.Remove(cronList[id])
	inspect := Cr.Entries()
	fmt.Print(inspect)
}
