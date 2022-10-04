import os  # noqa
import json
from flask import request, url_for, session, redirect, jsonify  # noqa
from blog import app, oauth  # noqa
from blog.user.model import User  # noqa


# @app.route('/user/login')
# def login():
#     redirect_uri = url_for('callback', _external=True)
#     print("==========================================")
#     print(redirect_uri)
#     print("==========================================")
#     return oauth.google.authorize_redirect(redirect_uri)


def signup(request):
    user = User(email=request.form.get('email'),
                name=request.form.get('name'),
                image=request.form.get('image'))
    user.save()
    return jsonify(user), 201


@app.route('/user/login/<email>')
def login(email: str):
    user = User.objects(email=email).first()
    if user:
        return json.dumps(user.to_json())
    else:
        return signup(request)


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


# @app.route('/user/signup', methods=['POST'])
# def signup():
#     return User.signup(request.get_json())


@app.route('/user/update', methods=['POST'])
def update_user():
    return User.update_user(request.get_json())
