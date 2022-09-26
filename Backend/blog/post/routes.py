from datetime import datetime
from flask import request, jsonify, url_for
from blog import app
from blog.post.model import Post, User
from io import BytesIO
from flask.helpers import send_file


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    tags = request.form.get('tags').split(",")
    print("request.form.get('tags'): ", tags)
    image_ = request.files["image"]
    # print(encoded)
    user = User.objects(email=request.form.get('email')).first()
    # image = Image(src=image_,
    #               alt=request.form.get('alt'),
    #               original=request.form.get('original'),
    #               caption=request.form.get('caption')).save()
    # print("====================")
    # print(image)
    # print("====================")
    # user = User.get_user(email="Kshitij@kshitij.com")
    post = Post(title=request.form.get('title'),
                content=request.form.get('content'),
                author=user,
                summary=request.form.get('summary'),
                slug=request.form.get('slug'),
                isEdited=request.form.get('isEdited'),
                views=request.form.get('views'),
                tags=tags,
                publishedAt=datetime.now(),
                alt=request.form.get('alt'),
                original=request.form.get('original'),
                caption=request.form.get('caption'))
    post.mainImage.put(image_,
                       content_type=image_.content_type,
                       filename=image_.filename)
    post.submit_post()

    return jsonify(post), 201


@app.route("/post/get")
def get_posts():
    return Post.get_all_posts()


@app.route("/post/get/<slug>")
def get_post(slug):
    post = Post.get_post(slug)
    image = url_for("get_image", post=post)
    return jsonify(post), image


@app.route("/post/get/image/<slug>")
def get_image(slug: Post):
    post = Post.get_post(slug)
    image = post.mainImage.read()
    content_type = post.mainImage.content_type
    # filename = post.mainImage.filename
    return send_file(BytesIO(image), mimetype=content_type)
