from turtle import title
from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from blog import db
from blog.user.model import User


class Post(db.Document):
    """
        Post Model
        title: string
        content: string
        userId: string
        summary: string
        slug: string
        publishedAt: date
    """

    title = db.StringField(required=True)
    content = db.StringField(required=True)
    userId = db.ReferenceField(User)
    summary = db.StringField(required=True)
    slug = db.StringField(required=True)
    publishedAt = db.DateTimeField(required=True)


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
        post = Post.objects(slug=self.slug).first()
        if post:
            return {"error": "Post already exists", "status": 400}
        else:
            self.save()
            return {"success": "Post created successfully", "status": 200}
    
    def get_post(self, slug):
        return Post.objects(_id=slug).first()
    
    def get_all_posts(self):
        return Post.objects()
    
