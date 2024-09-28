

build-db:
	docker network create todo_app_nw || true
	docker-compose -f docker-compose-db.yaml up -d