from flask import jsonify, session
from blog import db
import datetime


class User(db.Document):
    """
        User Model
        user_id: str
        name: str
        email: str
        password: str
        image: str
        \n--------- Author ----------\n
        bio: str
        joined: str

        meta = {
        'collection': 'users',
        'strict': False
        }

    """
    name = db.StringField(required=True, max_length=200, unique=True)
    email = db.StringField(required=True, primary_key=True)
    image = db.StringField(required=False, max_length=200)
    bio = db.StringField(required=False, max_length=300, default="")
    joined = db.DateTimeField(required=True, default=datetime.datetime.utcnow)

    def to_json(self):
        user = {
            'name': self.name,
            'email': self.email,
        }
        return jsonify(user)

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def get_user(email):
        user = User.objects(email=email).first()
        return user.to_json()

    def update_user(user):
        user_ = User.objects(email=user['email']).first()
        try:
            user_.update(**user)
            return {"success": "User updated successfully", "status": 200}
        except Exception as e:
            return {"error": str(e), "status": 400}

    def signup(self):
        user = User.objects(email=self.email).first()
        if user:
            return {"error": "User already exists", "status": 400}
        else:
            self.save()
            return {"success": "User created successfully", "status": 200}