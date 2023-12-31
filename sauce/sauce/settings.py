import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

if DEBUG:
    from .config import TestConfig
    config_settings = TestConfig()



SECRET_KEY = '1fgilsdijgsidjgnsdfl;gknjsd;fkgliuhqweprkxcv;l'



INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main_app.apps.MainAppConfig',
    'chat.apps.ChatConfig',
    'rest_framework',
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'sauce.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ASGI_APPLICATION = 'sauce.asgi.application'
WSGI_APPLICATION = 'sauce.wsgi.application'
CHANNELS_REDIS_HOST = "localhost"
CHANNELS_REDIS_PORT = 6379
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [f"redis://{CHANNELS_REDIS_HOST}:{CHANNELS_REDIS_PORT}/3"],
        },
    },
}

if DEBUG is False:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config_settings.DBNAME,
            'HOST': config_settings.DBHOST,
            'PORT': config_settings.DBPORT,
            'USER': config_settings.DBUSER,
            'PASSWORD': config_settings.DBPASSWORD
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / "db.sqlite3",
            
        }
    }

ALLOWED_HOSTS = ['194.58.100.194','194-58-100-194.cloudvps.regruhosting.ru', '127.0.0.1', 'localhost']

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



STATIC_URL = 'static/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'main_app.SauceUser'
AUTHENTICATION_BACKENDS = (
    'main_app.backends.SauceAuthenticationBackend', 
    
    )
#Logging

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'main_app_error': {
#             'level': 'ERROR',
#             'class': 'logging.FileHandler',
#             'filename': 'sauce/main_app/logs/errors.log',
#         }
        
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['main_app_error'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }

