from flask import Flask, escape, request
from sqlalchemy import text
import detect_id
from flask_cors import CORS
app = Flask('helloworld')
CORS(app)
#@app.route('/')
#def hello():
#    return 'Hello, World!'

@app.route('/api/args')#example request: /api/args?user=111&image=http:/adslfkjalakjd
def algo():
    print(request.args)
    user = request.args.get('user')
    image = request.args.get('image')
    print(user)
    print(image)
    if user is None:
        return {"error":"no user"}
    #fields = db.engine.execute("select fields from config where user.like(user)")
    fields={"PasspordCardno":"id","Nationality":"ot", "Surname":"co", "GivenNames":"Doe","Sex":"male", "DateofBirth":"09/09/09", "PlaceofBirth":"jer"}
    result = detect_id.detect_id(image) # =call to algo function
    return result, fields

@app.route('/api/addConfig',methods=['POST'])
def addConfig():
    request_json= request.get_json()
    print (request_json)
    #put config in spl
    return 'true'


if __name__ == '__main__':
    app.run(threaded=True)


