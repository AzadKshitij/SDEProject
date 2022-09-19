from flask import request
from blog import app
from blog.user.model import User


@app.route('/user/signup', methods=['POST'])
def signup():
    return User(name=request.get_json().get('name'),
                password=request.get_json().get("password"),
                email=request.get_json().get("email")).signup()


@app.route('/user/signout')
def signout():
    return User().signout()


@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

@app.route('/user/all')
def profile():
    return User().get_all_users()