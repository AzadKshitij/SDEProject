from blog import db


class Author(db.Document):
    """
        Author Model
        name: str
        email: str
        image: str
    """
    name = db.StringField()
    email = db.StringField()
    image = db.StringField()
    bio = db.StringField()

    def to_json(self):
        return {
            'name': self.name,
            'email': self.email,
            'image': self.image,
            'bio': self.bio
        }