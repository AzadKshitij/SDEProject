from flask import Flask
import flask_mongoengine as mongoengine
import os

# Connect to MongoDB
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'blog',
    'host': 'mongodb',
    'port': 27017,
    'username': 'root',
    'password': 'pass',
    'authSource': 'admin'
}
# app.config["MONGO_URI"] = 'mongodb://bloguser:pwd@mongodb:27017/blog'
# app.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']


# set secret key
app.config['SECRET_KEY'] = 'secret'
# app.secret_key = 'asda djasdhkjas dhasd jkasdh asdhhas dkjashd kj'
db = mongoengine.MongoEngine(app)


from blog import route  # noqa
