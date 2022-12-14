from configparser import DuplicateSectionError
# from importlib.metadata import requires
from flask import jsonify
from blog import db
from blog.user.model import User
import datetime


class Post(db.Document):
    """
        Post Model

        title: string
        summary: string
        content: string(HTML)
        author: User
        slug: string
        isEdited: boolean
        isPublished: boolean
        publishedAt: date
        tags: array
        views: number
        mainImage: string
    """

    title = db.StringField(required=True)
    summary = db.StringField(required=True)
    content = db.StringField(required=True)
    author = db.ReferenceField(User, reverse_delete_rule=db.CASCADE)
    slug = db.StringField(required=True)
    isEdited = db.BooleanField(default=False)
    isPublished = db.BooleanField(default=True)
    views = db.IntField(default=0)
    tags = db.ListField(db.StringField(max_length=30), default=[""])
    mainImage = db.StringField()
    alt = db.StringField(required=True)
    original = db.StringField()
    caption = db.StringField()
    publishedAt = db.DateTimeField(required=True,
                                   default=datetime.datetime.utcnow)

    meta = {'indexes': [
        {'fields': ['$title', "$content", "$summary"],
         'default_language': 'english',
         'weights': {'title': 10, 'summary': 8, 'content': 3}
         }
    ],
        'allow_inheritance': True}

    def to_json(self):
        user = {
            "title": self.title,
            "content": self.content,
            "userId": self.userId.to_json(),
            "summary": self.summary,
            "slug": self.slug,
            "publishedAt": self.publishedAt
        }
        return jsonify(user)

    def submit_post(self):
        print("self.slug: ", self.slug)
        post = Post.objects(slug=self.slug).first()
        if post:
            raise DuplicateSectionError(section="Slug")
            # return {"error": "Post already exists", "status": 400}
        else:
            self.save()
            return {"success": "Post created successfully", "status": 200}

    @staticmethod
    def get_post(slug):
        # return Post.objects.first_or_404(slug=slug)
        return Post.objects(slug=slug).first()

    @staticmethod
    def get_all_posts():
        return Post.objects()
