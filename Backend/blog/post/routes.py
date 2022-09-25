from datetime import datetime
from flask import request, jsonify
from blog import app
from blog.post.model import Post, User


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    print(request.json)
    user = User.objects(email=request.get_json().get('email')).first()

    print("====================")
    print(user)
    print("====================")
    # user = User.get_user(email="Kshitij@kshitij.com")
    post = Post(title=request.get_json().get('title'),
                content=request.get_json().get('content'),
                author=user,
                summary=request.get_json().get('summary'),
                slug=request.get_json().get('slug'),
                publishedAt=datetime.now()).submit_post()

    return jsonify(post)


@app.route("/post/get")
def get_posts():
    return Post.get_all_posts()


@app.route("/post/get/<slug>")
def get_post(slug):
    return Post.get_post(slug)
