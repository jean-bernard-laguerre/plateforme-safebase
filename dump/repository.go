package dump

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
)

func (d *DumpModel) Create(name string, cron_job string, connection_id int) (bool, error) {
	_, err := config.DB.Exec("INSERT INTO backup ( name, cron_job, connection_id, created_at) VALUES( ?, ?, ?, NOW())", name, cron_job, connection_id)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (d *DumpModel) GetAll() ([]DumpModel, error) {
	rows, err := config.DB.Query("SELECT * FROM backup")
	if err != nil {
		return []DumpModel{}, err
	}
	defer rows.Close()

	backups := []DumpModel{}

	for rows.Next() {
		var d DumpModel
		err := rows.Scan(&d.Id, &d.Name, &d.Cron_job, &d.Connection_id, &d.Created_at)
		if err != nil {
			return []DumpModel{}, err
		}
		backups = append(backups, d)
	}
	return backups, nil
}

func (d *DumpModel) Delete(id int) (bool, error) {
	_, err := config.DB.Exec("DELETE FROM backup WHERE id = ?", id)
	if err != nil {
		return false, err
	}
	return true, nil
}
