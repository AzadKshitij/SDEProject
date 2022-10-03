from datetime import datetime
# import json
from flask import request, jsonify  # , url_for  # , after_this_request
from blog import app, s3, BUCKET
from blog.post.model import Post, User
from werkzeug.utils import secure_filename


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    tags = request.form.get('tags').split(",")
    # print("request.form.get('tags'): ", tags)
    image_ = request.files["image"]
    file_name = secure_filename(image_.filename)
    s3.upload_fileobj(image_,
                      BUCKET,
                      "Posts/{}".format(file_name),
                      ExtraArgs={
                          "ACL": "public-read",
                          "ContentType": image_.content_type
                      })

    file_url = 'https://s3.ap-south-1.amazonaws.com/%s/%s' % (
        BUCKET, "Posts/{}".format(file_name))
    # https://s3.ap-south-1.amazonaws.com/aviato-iitj/Posts/EUYxhj.png
    user = User.objects(email=request.form.get('email')).first()
    post = Post(title=request.form.get('title'),
                content=request.form.get('content'),
                author=user,
                summary=request.form.get('summary'),
                slug=request.form.get('slug'),
                isEdited=request.form.get('isEdited'),
                views=request.form.get('views'),
                tags=tags,
                publishedAt=datetime.now(),
                mainImage=file_url,
                alt=request.form.get('alt'),
                original=request.form.get('original'),
                caption=request.form.get('caption'))
    post.submit_post()

    return jsonify(post), 201


@app.route("/post/get")
def get_posts():
    return Post.get_all_posts()


@app.route("/post/get/<slug>")
def get_post(slug):
    post = Post.get_post(slug)
    return jsonify(post), 200
