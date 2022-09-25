from flask import Flask
import flask_mongoengine as mongoengine
from authlib.integrations.flask_client import OAuth
import os
from blog import config  # noqa

# import os

# Connect to MongoDB
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'blog',
    'host': 'localhost',
    'port': 27017,
}
########################################
######### For Docker Container ######### # noqa
########################################
# app.config['MONGODB_SETTINGS'] = {
#     'db': 'blog',
#     'host': 'mongodb',
#     'port': 27017,
#     'username': 'root',
#     'password': 'pass',
#     'authSource': 'admin'
# }

# set secret key
app.config['SECRET_KEY'] = os.environ.get('GOOGLE_CLIENT_SECRET')
app.config.from_object('config')
# app.secret_key = 'asda djasdhkjas dhasd jkasdh asdhhas dkjashd kj'
db = mongoengine.MongoEngine(app)
oauth = OAuth(app)

# check if db is connected
print(db)

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

oauth.register(
    name='google',
    # client_id=os.environ.get('GOOGLE_CLIENT_ID'),
    # client_secret=os.environ.get('GOOGLE_CLIENT_SECRET'),
    # access_token_url='https://accounts.google.com/o/oauth2/token',
    # access_token_params=None,
    # authorize_url='https://accounts.google.com/o/oauth2/auth',
    # authorize_params=None,
    # api_base_url='https://www.googleapis.com/oauth2/v1/',
    server_metadata_url=CONF_URL,
    client_kwargs={'scope': 'openid email profile'})

from blog import route  # noqa
