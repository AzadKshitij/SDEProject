import os  # noqa
import json
from flask import request, url_for, session, redirect, jsonify  # noqa
from blog import app, oauth  # noqa
from blog.user.model import User  # noqa


# @app.route('/user/signup', methods=['POST'])
def signup(request):
    print(
        "=========================\n",
        request.get_json(), "\n"
        "========================="
    )
    data = request.get_json()

    user = User(email=data.get('email'),
                name=data.get('name'),
                image=data.get('image'),
                bio=data.get('bio') or '')
    user.save()
    return jsonify(user), 201


@app.route('/user/login/<email>', methods=['POST'])
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
