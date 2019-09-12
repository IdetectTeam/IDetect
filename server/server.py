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

@app.route('/api/args')  # example request: /api/args?user=111&image=http:/adslfkjalakjd
def algo():
    user = request.args.get('user')
    image = request.args.get('image')
    if user is None:
        return {"error": "no user"}
    # fields = db.engine.execute("select fields from config where user.like(user)")
    # fields=pre_ocr_api.getconfig(origin)send the origin  of the site
    # fields = {'Passpord Card no': 'id', 'Nationality': 'nationality', 'Surname': 'first_name',
    # 'Given Names': 'last_name', 'Sex': 'sex', 'Date of Birth': 'dateOfBirth', 'Place of Birth': 'birth_place'}
    fields = connect_to_datastoresql.get_config(user) 
    result = detect_id.detect_id(image)  # =call to algo function
    response = {'result': result, 'fields': json.dumps(fields)}
    return response


#
# @app.route('/api/addConfig', methods=["GET", "POST"])
# # @app.route('/api/addConfig/args')
# def addConfig():
#     print(request.form)
#     site = request.form.get('adress')
#     con = request.form.get('configurationsite')
#     # site = request.args.get('adress')
#     # con = request.args.get('configurationsite')


@app.route('/api/addConfig', methods=["GET", "POST"])
def addConfig():
    if request.method == "POST":
        print(request.form)
        site = request.form.get('user')
        con = request.form.get('configurationsite')
        # site = request.args.get('adress')
        # con = request.args.get('configurationsite')
        print("site {} his config {}".format(site, con))
        connect_to_datastoresql.connect_to_sql(site, con)
        return "true post"


@app.route('/api/hasConfig', methods=["GET", "POST"])
def hasConfig():
    if request.method == "GET":
        site = request.args['user']
        return connect_to_datastoresql.check_sql(site)
    return "false"


if __name__ == '__main__':
    # app.run(threaded=True,ssl_context='adhoc')
    app.run(threaded=True)
