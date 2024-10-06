include ../.env

# goose-create name=init
goose-create:
	goose create $(name) sql

goose-up:
	goose ${GOOSE_DRIVER} "${GOOSE_DBSTRING}" up

goose-down:
	goose ${GOOSE_DRIVER} "${GOOSE_DBSTRING}" up