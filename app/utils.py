# coding: utf-8
import traceback
import logging
from functools import wraps

from flask import abort, current_app
from werkzeug.exceptions import HTTPException

logger = logging.getLogger()


def handle_exception(func):
    '''
    Since the flask does not provide a function for catching and analysing
    the exceptions, it's difficult that knowing what happened on the fly.
    If you decorate a view with this, the wrapper can handle the exceptions
    and log it automatically.

    :param func: The view function to decorate.
    :type func: function
    '''
    @wraps(func)
    def decorated_view(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except HTTPException, e:
            raise e
        except Exception, e:
            current_app.logger.warn(traceback.format_exc())
            abort(500)
    return decorated_view
