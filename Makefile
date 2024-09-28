include ./.env

build-db:
	docker network create todo_app_nw || true
	docker-compose -f docker-compose-db.yaml up -d

run:
	yarn dev


code-gen:
	yarn kysely-codegen --out-file src/infrastructure/database/types.ts
