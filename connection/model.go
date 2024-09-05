package connection

type ConnectionModel struct {
	id       int
	name     string
	host     string
	port     string
	user     string
	password string
	db_name  string
	db_type  string
	user_id  int
}
