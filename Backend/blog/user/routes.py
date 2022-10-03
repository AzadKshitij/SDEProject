import os  # noqa
from flask import request, url_for, session, redirect  # noqa
from blog import app, oauth  # noqa
from blog.user.model import User  # noqa


@app.route('/user/login')
def login():
    redirect_uri = url_for('callback', _external=True)
    print("==========================================")
    print(redirect_uri)
    print("==========================================")
    return oauth.google.authorize_redirect(redirect_uri)


@app.route('/user/login/callback')
def callback():
    token = oauth.google.authorize_access_token()

    session['user'] = token['userinfo']
    # print("==========================================")
    # print(token)
    # print("==========================================")
    # print("==========================================")
    # print(session['user'])
    # print("==========================================")

    return redirect('/')


@app.route('/user/signup', methods=['POST'])
def signup():
    return User.signup(request.get_json())


@app.route('/user/update', methods=['POST'])
def update_user():
    return User.update_user(request.get_json())
