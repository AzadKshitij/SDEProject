# from flask import jsonify, session
from blog import db
import datetime
# from blog.user.model import User


class Notification(db.Document):
    """
        Notification Model

        content: string
        user_id: string
        isRead: boolean
    """
    content = db.StringField(required=True)
    user_id = db.StringField(required=True)
    isRead = db.BooleanField(required=True, default=False)
    createdAt = db.DateTimeField(required=True,
                                 default=datetime.datetime.utcnow)
