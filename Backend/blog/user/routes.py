from blog import app
from blog.user.model import User


@app.route('/user/signup', methods=['POST', 'GET'])
def signup():
    return User().signup()


@app.route('/user/signout')
def signout():
    return User().signout()


@app.route('/user/login', methods=['POST'])
def login():
    return User().login()
