import json

from flask import Flask, escape, request
from flask_cors import CORS

app = Flask('helloworld')
CORS(app)


@app.route('/api/addConfig', methods=['POST'])
def addConfig():
    print(request.args)
    print("website: {} configure: {}".format(request.args.get('user'), request.args.get('configuration')))
    # request_json = request.get_json()
    # print(request_json)
    # put config in spl
    return 'true'


if __name__ == '__main__':
    app.run(threaded=True)
