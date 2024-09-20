package history

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jean-bernard-laguerre/plateforme-safebase/config"
)

// to create an history
func (h *HistoryModel) Create(name string, status bool, action string, created_at string, bdd_source int, bdd_target *int) (int, error) {
	result, err := config.DB.Exec("INSERT INTO history (name, status, action, created_at, bdd_source, bdd_target) VALUES(?, ?, ?, ?, ?, ?)", name, status, action, created_at, bdd_source, bdd_target)
	if err != nil {
		return 0, err
	}
	id, _ := result.LastInsertId()
	return int(id), nil
}

// to get an history by id
func (h *HistoryModel) GetById(id int) (HistoryModel, error) {
	err := config.DB.QueryRow("SELECT * FROM history WHERE id = ?", id).Scan(&h.Id, &h.Name, &h.Status, &h.Action, &h.Created_at, &h.Bdd_source, &h.Bdd_target)
	if err != nil {
		return HistoryModel{}, err
	}
	return *h, nil
}

// TODO :=> TEST THIS FUNCTION
func (h *HistoryModel) GetAll() ([]HistoryModel, error) {
	rows, err := config.DB.Query("SELECT * FROM history")
	if err != nil {
		return []HistoryModel{}, err
	}
	defer rows.Close()

	histories := []HistoryModel{}

	for rows.Next() {
		var h HistoryModel
		err := rows.Scan(&h.Id, &h.Name, &h.Status, &h.Action, &h.Created_at, &h.Bdd_source, &h.Bdd_target)
		if err != nil {
			return []HistoryModel{}, err
		}
		histories = append(histories, h)
	}

	return histories, nil
}

func (h *HistoryModel) GetByUserId(userId int, page int, limit int) ([]HistoryModel, error) {
	rows, err := config.DB.Query(`
		SELECT history.id, history.name, history.status, history.action, history.created_at, history.bdd_source, history.bdd_target
		FROM history
		Join connection ON history.bdd_source = connection.id
		WHERE connection.user_id = ?
		LIMIT ? OFFSET ?`, userId, limit, page)
	if err != nil {
		return []HistoryModel{}, err
	}
	defer rows.Close()

	histories := []HistoryModel{}

	for rows.Next() {
		var h HistoryModel
		err := rows.Scan(&h.Id, &h.Name, &h.Status, &h.Action, &h.Created_at, &h.Bdd_source, &h.Bdd_target)
		if err != nil {
			return []HistoryModel{}, err
		}
		histories = append(histories, h)
	}

	return histories, nil
}

// To delete a history
func (h *HistoryModel) Delete(id int) (bool, error) {
	_, err := config.DB.Exec("DELETE FROM history WHERE id = ?", id)
	if err != nil {
		return false, err
	}
	return true, nil
}
