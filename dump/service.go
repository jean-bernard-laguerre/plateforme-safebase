package dump

import (
	"fmt"
	"os"
	"os/exec"
	"time"

	"github.com/jean-bernard-laguerre/plateforme-safebase/connection"
	"github.com/jean-bernard-laguerre/plateforme-safebase/history"
)

func SaveHistory(name string, status bool, action string, created_at string, bdd_source int, bdd_target *int) (bool, error) {
	h := history.HistoryModel{}
	return h.Create(name, status, action, created_at, bdd_source, bdd_target)
}

func PostgresDump(b *DumpModel, c *connection.ConnectionModel) string {
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

func MysqlDump(b *DumpModel, c *connection.ConnectionModel) string {
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

func PostgresRestore(h *history.HistoryModel, c *connection.ConnectionModel) string {
	containerName := "MyPOSTGRES"
	connection := connection.ConnectionModel{}
	target, targetError := connection.GetById(*h.Bdd_target)
	if targetError != nil {
		return fmt.Sprintf("Error:", targetError)
	}
	databaseName := target.Db_name
	fileName := h.Name
	time := time.Now().Local().Format("2006-01-02T15-04-05")
	path := "./backups/postgres/" + fileName
	cmd := exec.Command("docker", "exec", "-i", containerName, "psql", "--user", "postgres", databaseName)
	infile, err := os.Open(path)
	if err != nil {
		SaveHistory(fileName, false, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Error:", err)
	}
	defer infile.Close()
	cmd.Stdin = infile
	runError := cmd.Run()
	if runError != nil {
		SaveHistory(fileName, false, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Error:", runError)
	} else {
		SaveHistory(fileName, true, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Restore created successfully")
	}
}

func MysqlRestore(h *history.HistoryModel, c *connection.ConnectionModel) string {
	containerName := "MyMYSQL"
	connection := connection.ConnectionModel{}
	target, targetError := connection.GetById(*h.Bdd_target)
	if targetError != nil {
		return fmt.Sprintf("Error:", targetError)
	}
	databaseName := target.Db_name
	fileName := h.Name
	time := time.Now().Local().Format("2006-01-02T15-04-05")
	path := "./backups/mysql/" + fileName
	cmd := exec.Command("docker", "exec", "-i", containerName, "mysql", "--user", "root", "--password=verysecure", databaseName)
	infile, err := os.Open(path)
	if err != nil {
		SaveHistory(fileName, false, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Error:", err)
	}
	defer infile.Close()
	cmd.Stdin = infile
	runError := cmd.Run()
	if runError != nil {
		SaveHistory(fileName, false, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Error:", runError)
	} else {
		SaveHistory(fileName, true, "Restore", time, h.Bdd_source, h.Bdd_target)
		return fmt.Sprintf("Restore created successfully")
	}
}
