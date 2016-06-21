import os
from werkzeug.contrib.fixers import ProxyFix
from app import create_app

app = create_app('production')
app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == '__main__':
    app.run()
