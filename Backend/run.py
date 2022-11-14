from blog import app
# db
import logging
# import os
from dotenv import load_dotenv
from waitress import serve
import os 

load_dotenv()

is_docker = os.environ.get('AM_I_IN_A_DOCKER_CONTAINER', True)

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.DEBUG)
# logging.basicConfig(filename='app.log', filemode='w',
# format='%(asctime)s - %(message)s', level=logging.DEBUG)
logger = logging.getLogger("flask.app")



if __name__ == '__main__':
    logger.debug("http://127.0.0.1:5000")
    logger.info("os.environ.get('S3_BUCKET'): %s", os.environ.get('S3_BUCKET'))
    logger.info("os.environ.get('S3_KEY'): %s", os.environ.get('S3_KEY'))
    logger.info("os.environ.get('S3_SECRET'): %s", os.environ.get('S3_SECRET'))
    # logger.debug(os.environ['APP_DB_1_PORT_27017_TCP_ADDR'])
    # for k, v in sorted(os.environ.items()):
    #     logger.debug(k,':', v)
    # print('\)
    app.run(host="0.0.0.0", port=5000, debug=True)
