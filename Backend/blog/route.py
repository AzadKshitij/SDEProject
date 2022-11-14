# from flask import request, jsonify  # , url_for  # , after_this_request
from blog import app
import json

from blog.user.model import User

# Routes
from blog.user.routes import *  # noqa
from blog.post.routes import *  # noqa
from blog.notification.route import *  # noqa


@app.route('/')
def index():
    return "<a href='/user/login'>Login</a>"

# @app.route('/user/signup', methods=['POST'])
# def signup():
#     user = User(email=request.get_json().get('email'),
#                 name=request.get_json().get('name'),
#                 image=request.get_json().get('image'))
#     user.save()
#     return jsonify(user), 201


@app.route('/test')
def test():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    return User.objects().all().to_json()


@app.route('/post/<int:post_id>')
def post(post_id):
    post = json.load(open('blog/posts.json')).get('posts')[post_id]

    # author = Author.objects(name=post.get('author').get('name')).first()
    # if author:
    #     print(author)
    #     return post
    # else:
    #     author = Author(
    #         name=post.get('author').get('name'),
    #         email=post.get('author').get('email'),
    #         image="https://avatars0.githubusercontent.com/u/25279263?s=460&v=4"
    #     )
    #     author.save()
    return post


@app.route('/post/<author>')
def author(author):
    posts = json.load(open('blog/posts.json')).get('posts')
    # get post with particular author
    a_post = [
        post for post in posts if post.get('author').get('name') == author
    ]
    return a_post
