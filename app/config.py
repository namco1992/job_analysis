# coding: utf-8
import os
import logging
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    LOGGING_FORMAT = '%(asctime)s %(filename)s %(funcName)s:%(lineno)d [%(levelname)s] %(message)s'
    LOGGING_LOCATION = 'log/jobs.log'
    LOGGING_LEVEL = logging.DEBUG

    # bootstrap settings
    BOOTSTRAP_SERVE_LOCAL = True
    BOOTSTRAP_QUERYSTRING_REVVING = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    TESTING = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    DEBUG = True


class ProductionConfig(Config):
    TESTING = True
    DEBUG = True


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
    }
