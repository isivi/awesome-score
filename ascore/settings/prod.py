from ascore.utils.dict import update_recursive
from .base import *

DEBUG = False

ALLOWED_HOSTS += [
    'ascore.isivi.pl',
    'createfuture.isivi.pl',
    'createfuture.it',
]


# Compressor

# css and js compressing active
COMPRESS_ENABLED = True
COMPRESS_PRECOMPILERS += PROD_LESS_PRECOMPILER

# NOTE:
# If any css/js production only issues should take place, this is the first place to check.
COMPRESS_CSS_FILTERS = PROD_COMPRESS_CSS_FILTERS
COMPRESS_JS_FILTERS = PROD_COMPRESS_JS_FILTERS


# Webpack

update_recursive(WEBPACK_LOADER, WEBPACK_LOADER_PROD)
