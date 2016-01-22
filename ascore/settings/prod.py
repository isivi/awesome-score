from ..utils import update_recursive
from .base import *

DEBUG = False

ALLOWED_HOSTS += [
    'ascore.isivi.pl',
]

update_recursive(WEBPACK_LOADER, WEBPACK_LOADER_PROD)
