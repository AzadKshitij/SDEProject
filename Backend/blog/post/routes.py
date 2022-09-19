from datetime import datetime
from flask import request
from blog import app
from blog.post.model import Post, User


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    user = User.get_user(email="Kshitij@kshitij.com")
    print(user)
    post = Post(
        title = request.get_json().get('title'),
        content = request.get_json().get('content'),
        userId = user,
        summary = request.get_json().get('summary'),
        slug = request.get_json().get('slug'),
        publishedAt = datetime.now()
    ).submit_post()

    return post

@app.route("/post/get")
def get_posts():
    post = Post.objects()
    return post.to_json()