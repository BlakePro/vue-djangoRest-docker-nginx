python3 manage.py makemigrations app
python3 manage.py migrate app
python3 manage.py runserver


docker-compose run app python3 manage.py makemigrations app
docker-compose run app python3 manage.py migrate app
docker-compose up
