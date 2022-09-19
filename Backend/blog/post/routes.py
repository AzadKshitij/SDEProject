from datetime import datetime
from flask import request
from blog import app
from blog.post.model import Post, User


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    user = User.get_user(email="email")
    print(user.to_json())
    return Post(
        title = "Title",
        content = "Content",
        userId = user,
        summary = "Summary",
        slug = "slug",
        publishedAt = datetime.now()
    ).submit_post()