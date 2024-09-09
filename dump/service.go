package dump

import (
	"fmt"
	"os"
	"os/exec"
	"time"
)

//DONE 1. Create a function that execute the command to dump the database and return the 	 message of success or error
//TODO 2. Make the params from the command dynamic via the controller
//TODO 3. ADD date to the backup file name to avoid overwriting the previous backup
func PostgresDump(dbName string,  ) string {
	containerName := "MyPOSTGRES"
	databaseName := dbName
	time := time.Now().Local().Format("2006-01-02T15:04:05")

	cmd := exec.Command("docker", "exec", containerName, "pg_dump", "-U", "postgres", "-d", databaseName)
	outfile, err := os.Create("./" + databaseName + "_" + time + ".sql")	
	defer outfile.Close()
	cmd.Stdout = outfile
	err = cmd.Run()
		if err != nil {
			return fmt.Sprintf("Error:", err)
		} else {
			return fmt.Sprintf("Backup created successfully")
		}
	}


func MysqlDump(dbName string) string {
	containerName := "MyMYSQL"
	databaseName := dbName
	time := time.Now().Local().Format("2006-01-02T15:04:05")
	 
	cmd := exec.Command("docker", "exec", containerName, "mysqldump", "--user", "root", "--password=verysecure", databaseName)
	outfile, err := os.Create("./" + databaseName + "_" + time + ".sql")
	defer outfile.Close()
	cmd.Stdout = outfile
	err = cmd.Run()
	if err != nil {
		return fmt.Sprintf("Error:", err)
	} else {
		return fmt.Sprintf("Backup created successfully")
	}
}