from bson import json_util
from flask import request, jsonify  # , url_for  # , after_this_request
from blog import app  # , s3, BUCKET
from blog.notification.model import Notification


@app.route("/notifications/send", methods=["POST"])
def send_notification():
    data = request.get_json()
    notification = Notification(
        content=data.get("content"),
        user_id=data.get("email"),
        isRead=False
    )
    notification.save()
    return jsonify({"message": "Notification sent successfully"}), 200


@app.route("/notifications/set", methods=["POST"])
def set_read():
    data = request.get_json()
    notification = Notification.objects(user_id=data.get("email"))
    notification.update(isRead=True, multi=True)
    return jsonify({"message": "Notifications set to read successfully"}), 200


@app.route("/notifications/get/<email>", methods=["GET"])
def get_all_notifications(email):
    notifications = Notification.objects(user_id=email)
    return json_util.dumps(notifications), 200


@app.route("/notifications/get-unread/<email>", methods=["GET"])
def get_unread_notifications(email):
    notifications = Notification.objects(user_id=email, isRead=False)
    return json_util.dumps(notifications), 200
