info:
	echo "\n"

	echo "Docker images"
	echo "-------------"
	(docker images | grep -e airline -e mongo) || true

	echo "\n"

	echo "Docker containers"
	echo "-----------------"
	(docker ps -a | grep airline) || true

	echo "\n"

build:
	docker-compose up -d

unbuild:
	docker-compose down

rebuild:
	docker-compose up -d --build --force-recreate

start:
	docker-compose start

stop:
	docker-compose stop

remove:
	docker-compose down
	docker rmi airline-app
