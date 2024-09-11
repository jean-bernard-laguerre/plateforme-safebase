package dump

import (
	"fmt"
	"os"
	"os/exec"
	"time"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/history"
)

// TODO :=> create a function that create all cronjob for the backups

func SaveHistory(name string, status bool, action string, created_at string, bdd_source int, bdd_target *int) (bool, error) {
	h := history.HistoryModel{}
	return h.Create(name, status, action, created_at, bdd_source, bdd_target)
}

func PostgresDump(c *connection.ConnectionModel) string {
	fmt.Println("Ok cron job")
	containerName := "MyPOSTGRES"
	databaseName := c.Db_name
	time := time.Now().Local().Format("2006-01-02T15-04-05")
	fileName := databaseName + "_" + time + ".sql"
	cmd := exec.Command("docker", "exec", containerName, "pg_dump", "-U", "postgres", "-d", databaseName)
	outfile, err := os.Create("./backups/postgres/" + fileName)
	defer outfile.Close()
	cmd.Stdout = outfile
	err = cmd.Run()
	if err != nil {
		SaveHistory(fileName, false, "Backup", time, c.Id, nil)
		return fmt.Sprintf("Error:", err)
	} else {
		SaveHistory(fileName, true, "Backup", time, c.Id, nil)
		return fmt.Sprintf("Backup created successfully")
	}
}

func MysqlDump(c *connection.ConnectionModel) string {
	fmt.Println("Ok cron job")
	containerName := "MyMYSQL"
	databaseName := c.Db_name
	time := time.Now().Local().Format("2006-01-02T15-04-05")
	fileName := databaseName + "_" + time + ".sql"

	cmd := exec.Command("docker", "exec", containerName, "mysqldump", "--user", "root", "--password=verysecure", databaseName)
	outfile, err := os.Create("./backups/mysql/" + fileName)
	defer outfile.Close()
	cmd.Stdout = outfile
	err = cmd.Run()
	if err != nil {
		SaveHistory(fileName, false, "Backup", time, c.Id, nil)
		return fmt.Sprintf("Error:", err)
	} else {
		SaveHistory(fileName, true, "Backup", time, c.Id, nil)
		return fmt.Sprintf("Backup created successfully")
	}
}
