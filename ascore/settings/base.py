# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^a%w=!-az5#)pw#$(qfujdta8u=^0&%759+_l+hp)$n#o%r#5_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Compressor
    'compressor',

    # Webpack
    'webpack_loader',

    'ascore.ascore_app',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'ascore.urls'

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

WSGI_APPLICATION = 'ascore.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


LANGUAGE_CODE = 'pl-pl'

TIME_ZONE = 'Europe/Warsaw'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_ROOT = os.path.join(BASE_DIR, 'public', 'static')

STATIC_URL = '/static/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',

    # compressor won't work without it when django.contrib.staticfiles enabled
    'compressor.finders.CompressorFinder',
)


# Templates

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': (
                # django
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.debug',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
                # ascore
                'ascore.context_processors.ascore_settings',
            ),

            'loaders': (
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ),
        }
    },
]


# Email

EMAIL_HOST = 'localhost'
EMAIL_PORT = 25


# Compressor

COMPRESS_ENABLED = False
COMPRESS_OFFLINE = False
COMPRESS_URL = STATIC_URL
COMPRESS_ROOT = STATIC_ROOT
COMPRESS_OUTPUT_DIR = 'compressed'
COMPRESS_PRECOMPILERS = ()  # pre-compiling only in production and while testing, compilers set in dedicated settings
COMPRESS_CSS_FILTERS = ('compressor.filters.css_default.CssAbsoluteFilter',)  # default, better filters only in prod
COMPRESS_JS_FILTERS = ()  # default, better filters only in prod

PROD_LESS_PRECOMPILER = (('text/less', 'lessc {infile} {outfile}'),)  # suggested prod settings
PROD_COMPRESS_CSS_FILTERS = ('compressor.filters.css_default.CssAbsoluteFilter',  # suggested prod settings
                             'compressor.filters.cssmin.rCSSMinFilter')
PROD_COMPRESS_JS_FILTERS = ('compressor.filters.jsmin.rJSMinFilter',)  # suggested prod settings


# Webpack

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': os.path.join(STATIC_ROOT, 'bundle'),
        'STATS_FILE': os.path.join(BASE_DIR, 'var/webpack_stats/', 'dev.json'),
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    },
}

WEBPACK_LOADER_PROD = {
    'DEFAULT': {
        'STATS_FILE': os.path.join(BASE_DIR, 'var/webpack_stats/', 'prod.json'),
    }
}

