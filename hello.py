from flask import Flask, escape, request
from sqlalchemy import text

app = Flask('helloworld')

#@app.route('/')
#def hello():
#    return 'Hello, World!'

@app.route('/api/args')#example request: /api/args?user=111&image=http:/adslfkjalakjd
def algo():
    if user is None:
        return {"error":"no user"}
    user= request.args.get('user')
    image= request.args.get('image')
    #fields = db.engine.execute("select fields from config where user.like(user)")
    fields={"PasspordCardno":"90","Nationality":"09", "Surname":"Doe", "GivenNames":"Doe","Sex":"male", "DateofBirth":"09/09/09", "PlaceofBirth":"jer"}
    result # =call to algo function
    return result, fields

@app.route('/api/addConfig',methods=['POST'])
def addConfig():
    request_json= request.get_json()
    print (request_json)
    #put config in spl
    return true


if __name__ == '__main__':
    app.run(threaded=True)


