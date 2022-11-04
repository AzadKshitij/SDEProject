from datetime import datetime
from configparser import DuplicateSectionError
# import pprint
# import json
# import pprint
from bson import json_util
import uuid
from slugify import slugify
# import bsonjs
# import json
from flask import request, jsonify  # , url_for  # , after_this_request
from blog import app, s3, BUCKET
from blog.post.model import Post, User
# from werkzeug.utils import secure_filename


@app.route("/post/submit", methods=["POST"])
def submit_post():
    print("###############################")
    print(request.form)
    print("###############################")
    # -----------------------------------------------------------------
    # print("sdj ashdkjs dhkasdk kaskjdh kjasdhkjahd")
    post = Post.objects(slug=request.form.get('slug')).first()
    slug = slugify(request.form.get('title'))
    if post:
        slug = slug + "-" + str(uuid.uuid4())[:8]

    tags = request.form.get('tags').split(",")
    # print("request.form.get('tags'): ", tags)
    image_ = request.files["image"]
    file_name = slug
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
                slug=slug,
                # isEdited=request.form.get('isEdited'),
                # views=request.form.get('views'),
                tags=tags,
                publishedAt=datetime.now(),
                mainImage=file_url,
                alt=request.form.get('alt'),
                original=request.form.get('original') or "",
                caption=request.form.get('caption')) or ""
    post.save()
    # -----------------------------------------------------------------
    return jsonify(post), 201


@app.route("/post/get")
def get_posts():

    pipeline = [
        {
            "$lookup": {
                "from": "user",
                "localField": "author",
                "foreignField": "_id",
                "as": "author"
            }
        },
        {
            "$sort":{
                "publishedAt": -1
            }
        },
        {
            "$unwind": "$author"
        },
    ]
    post = list(Post.objects().aggregate(pipeline))
    # print("============================")
    # pprint.pprint(post)
    # print("============================")
    post = json_util.dumps(post)
    # print("============================")
    return post, 200


@app.route("/post/get/<slug>")
def get_post(slug):
    post = Post.get_post(slug=slug)
    return jsonify(post), 200


# search post
@app.route("/post/search/<query>")
def search_post(query):
    post = Post.objects.search_text(query).order_by('$text_score')
    return jsonify(post), 200


# search post by tags
@app.route("/post/search/tags/<query>")
def search_post_by_tags(query):
    post = Post.objects(tags=query)
    return jsonify(post), 200
