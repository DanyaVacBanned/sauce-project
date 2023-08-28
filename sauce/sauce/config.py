import os

from dotenv import load_dotenv

dotenv_path = ".env"
load_dotenv(dotenv_path=dotenv_path)

class TestConfig:

    DBNAME = os.getenv("test_db_name")
    DBHOST = os.getenv("test_db_host")
    DBPORT = int(os.getenv("test_db_port"))
    DBUSER = os.getenv("test_db_user")
    DBPASSWORD = os.getenv("test_db_password")

    SECRET_KEY = os.getenv("SECRET_KEY")


class ProductionConfig:

    DBNAME = os.getenv("db_name")
    DBHOST = os.getenv("db_host")
    DBPORT = int(os.getenv("db_port"))
    DBUSER = os.getenv("db_user")
    DBPASSWORD = os.getenv("db_password")

    SECRET_KEY = os.getenv("SECRET_KEY")


