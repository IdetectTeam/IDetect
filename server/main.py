import json
from flask import Flask, escape, request
import detect_id
from flask_cors import CORS
import pre_ocr_api
import connect_to_datastoresql

app = Flask('helloworld')
CORS(app)
cnt = 0
print(cnt)


# @app.route('/')
# def hello():
#    return 'Hello, World!'

@app.route('/api/args', methods=["GET", "POST"])  # for local running
def detectImg():
    if request.method == 'OPTIONS':
        print('in options')
        cors_enabled_function_auth(request)
    if request.method == "POST":
        print(request.form)
        user = request.form.get('user')
        image = request.form.get('image')
        if user is None:
            return {"error": "no user"}, 400, get_headers()
        fields = connect_to_datastoresql.get_config(user)
        result = detect_id.detect_id(image, 'pasport_card_config.json')
        response = {'result': result, 'fields': fields}
        return response, 200, get_headers()


# @app.route('/api/args', methods=["GET", "POST"])  # for prodaction
# def detectImg(request):
#     if request.method == 'OPTIONS':
#         print('in options')
#         cors_enabled_function_auth(request)
#     if request.method == "POST":
#         print(request.form)
#         user = request.form.get('user')
#         image = request.form.get('image')
#         if user is None:
#             return {"error": "no user"}, 400, get_headers()
#         fields = connect_to_datastoresql.get_config(user)
#         result = detect_id.detect_id(image, 'pasport_card_config.json')
#         response = {'result': result, 'fields': fields}
#         return response, 200, get_headers()


@app.route('/api/addConfig', methods=["GET", "POST"])  # for local running
def addConfig():
    if request.method == 'OPTIONS':
        cors_enabled_function_auth(request)
    if request.method == "POST":
        print(request.form)
        site = request.form.get('adress')
        con = request.form.get('configurationsite')
        # site = request.args.get('adress')
        # con = request.args.get('configurationsite')
        print("site {} his config {}".format(site, con))
        connect_to_datastoresql.connect_to_sql(site, con)
        return '', 200, get_headers()


# @app.route('/api/addConfig', methods=["GET", "POST"])  # for prodaction
# def addConfig(request):
#     if request.method == 'OPTIONS':
#         cors_enabled_function_auth(request)
#     if request.method == "POST":
#         print(request.form)
#         site = request.form.get('adress')
#         con = request.form.get('configurationsite')
#         # site = request.args.get('adress')
#         # con = request.args.get('configurationsite')
#         print("site {} his config {}".format(site, con))
#         connect_to_datastoresql.connect_to_sql(site, con)
#         return '', 200, get_headers()

@app.route('/api/hasConfig', methods=["GET", "POST"])  # for local
def hasConfig():
    if request.method == "GET":
        site = request.args['user']
        if connect_to_datastoresql.check_sql(site) == 'true':
            return 'true'
    with open('pasport_card_config.json') as config_file:
        return (json.loads(config_file.read()))


# @app.route('/api/hasConfig', methods=["GET", "POST"])#for prodaction
# def hasConfig(request):
#     if request.method == 'OPTIONS':
#         cors_enabled_function_auth(request)
#     if request.method == "GET":
#         site = request.args['user']
#         if connect_to_datastoresql.check_sql(site) == 'true':
#           return 'true', 200, get_headers()
#     with open('pasport_card_config.json') as config_file:
#         return json.loads(config_file.read()), 200, get_headers()


def cors_enabled_function_auth(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return '', 204, headers


def get_headers():
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
    return headers


if __name__ == '__main__':
    # app.run(threaded=True,ssl_context='adhoc')
    app.run(threaded=True)
