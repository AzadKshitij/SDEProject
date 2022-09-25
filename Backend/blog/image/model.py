from flask import jsonify
from blog import db


class Image(db.Document):
    """
        Image Model
        src: str
        alt: str
        original str
        caption: str
        author: User
        post: Post

        meta = {
        'collection': 'images',
        'strict': False
        }

    """
    src = db.StringField(required=True)
    alt = db.StringField(required=True, max_length=200)
    original = db.StringField(required=True)
    caption = db.StringField(required=False, max_length=200)

    def to_json(self):
        image = {
            'src': self.src,
            'alt': self.alt,
            'original': self.original,
            'caption': self.caption,
        }
        return jsonify(image)

    def save_image(self):
        try:
            self.save()
            return {"success": "Image saved successful", "status": 200}
        except Exception as e:
            return {"error": str(e), "status": 400}

    def update_image(image):
        image_ = Image.objects(_id=image._id).first()
        try:
            image_.update(**image)
            return {"success": "Image updated successfully", "status": 200}
        except Exception as e:
            return {"error": str(e), "status": 400}
