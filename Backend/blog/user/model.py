from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from blog import db


class User(db.Document):
    """
        User Model
        name: str
        email: str
        password: str
    """
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()

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

    def signup(self):
        print(request.form)

        # Create the user object
        user = {
            "name": self.name,
            "email": self.email,
            "password": self.password
        }

        # Check for existing email address
        if User.objects(email=user['email']).first():
            return jsonify({"error": "Email address already in use"}), 400

        # Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        if User(**user).save():
            return self.start_session(user)

        return jsonify({"error": "Signup failed"}), 400

    def signout(self):
        session.clear()
        return redirect('/')

    def login(self):

        user = User.objects(email=self.email).first()

        if user and pbkdf2_sha256.verify(request.form.get('password'),
                                         user['password']):
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401
