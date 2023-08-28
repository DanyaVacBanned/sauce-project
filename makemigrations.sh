source .venv/bin/activate

python3 sauce/manage.py makemigrations
python3 sauce/manage.py migrate