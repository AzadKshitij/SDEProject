from blog import app, db
import logging

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.DEBUG)
# logging.basicConfig(filename='app.log', filemode='w', format='%(asctime)s - %(message)s', level=logging.DEBUG)
logger = logging.getLogger("flask.app")


if __name__ == '__main__':
    logger.debug("http://localhost:5000/")
    app.run(
        port=5000,
        debug=True
    )