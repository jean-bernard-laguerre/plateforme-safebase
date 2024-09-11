package dump

import (
	"fmt"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/robfig/cron/v3"
)

var Cr *cron.Cron

func InitCron() {
	fmt.Print("Cron job started")
	dumpModel := DumpModel{}
	dumps, err := dumpModel.GetAll()
	if err != nil {
		fmt.Print(err)
	}

	Cr = cron.New()
	for _, d := range dumps {
		Cr.AddFunc(d.Cron_job, func() {
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
	}
	Cr.Start()

}

func AddCronJob(cronJob string, id int) {
	connection := connection.ConnectionModel{}
	dbConn, error := connection.GetById(id)
	if error != nil {
		fmt.Print(error)
	}
	Cr.AddFunc(cronJob, func() {
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

}
