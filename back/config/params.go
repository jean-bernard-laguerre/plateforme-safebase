package config

type ParamsHandler struct {
	Page  int
	Limit int
}

func (p *ParamsHandler) Init() *ParamsHandler {
	p.Page = 0
	p.Limit = 10

	return p
}
