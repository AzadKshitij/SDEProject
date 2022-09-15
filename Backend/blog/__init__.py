from flask import Flask
import flask_mongoengine as mongoengine

# Connect to MongoDB
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'blog',
    'host': 'localhost',
    'port': 27017
}
# set secret key
app.secret_key = 'secret_key'
db = mongoengine.MongoEngine(app)


from blog import route  # noqa
