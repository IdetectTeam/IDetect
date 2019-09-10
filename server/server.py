import json
from flask import Flask, escape, request
# from sqlalchemy import text

import detect_id
from flask_cors import CORS
import pre_ocr_api

app = Flask('helloworld')
CORS(app)


# @app.route('/')
# def hello():
#    return 'Hello, World!'

@app.route('/api/args')  # example request: /api/args?user=111&image=http:/adslfkjalakjd
def algo():
    # print(request.args)
    user = request.args.get('user')
    image = request.args.get('image')
    print(user)
    print("#################################33")
    # print(image)
    if user is None:
        return {"error": "no user"}
    # fields = db.engine.execute("select fields from config where user.like(user)")
    # fields=pre_ocr_api.getconfig(origin)send the origin  of the site
    fields = {'Passpord Card no': 'id', 'Nationality': 'nationality', 'Surname': 'first_name',
              'Given Names': 'last_name', 'Sex': 'sex', 'Date of Birth': 'dateOfBirth', 'Place of Birth': 'birth_place'}
    result = detect_id.detect_id(image)  # =call to algo function
    response = {'result': result, 'fields': json.dumps(fields)}
    return response


@app.route('/api/addConfig', methods=["GET", "POST"])
def addConfig():
    if request.method == "POST":
        print(request.form)
        site = request.form.get('adress')
        con = request.form.get('configurationsite')
        print("site {} his config {}".format(site, con))

        return 'true'

    return 'false'


if __name__ == '__main__':
    app.run(threaded=True)
