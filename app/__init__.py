# coding: utf-8
import traceback
import logging
from logging.handlers import TimedRotatingFileHandler

from flask import Flask, g
from flask.ext.bootstrap import Bootstrap
from flask.ext.moment import Moment
from flask.ext.assets import Bundle, Environment

from config import config

bootstrap = Bootstrap()
moment = Moment()

# assets = Environment()

# bundles = {
#     }
# assets.register(bundles)


def create_app(config_name):
    try:
        app = Flask(__name__)
        app.config.from_object(config[config_name])
        config[config_name].init_app(app)
        # init the logging handler
        init_logging_handler(app)
        # init the add-ons
        bootstrap.init_app(app)
        moment.init_app(app)
        # assets.init_app(app)

        # register the blueprint
        from .main import main as main_blueprint
        app.register_blueprint(main_blueprint, url_prefix='/job_analysis')
    except Exception, e:
        print traceback.format_exc()

    return app


def init_logging_handler(app):
    handler = TimedRotatingFileHandler(app.config['LOGGING_LOCATION'], when='MIDNIGHT')
    handler.setLevel(app.config['LOGGING_LEVEL'])
    formatter = logging.Formatter(app.config['LOGGING_FORMAT'])
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
