import json
from google.oauth2 import service_account
import io
import os
# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
from google.protobuf.json_format import MessageToDict


from google.api_core.grpc_helpers import create_channel


def call_google_ocr_api(id_image_path):
<<<<<<< HEAD
    credentials = service_account.Credentials.from_service_account_file('C:\\Users\\This_User\\IDetect-0096da03810c.json')
=======
    credentials = service_account.Credentials.from_service_account_file('D:\google\google cloud\My Project 13006-213d69c6a9b9.json')
>>>>>>> 96c073d4c9135abb16ea5b1084c6c6d45af1023f
    # create_channel(target, credentials=None, scopes=None, ssl_credentials="C:\ProgramData\NetFree\CA\netfree-ca-bundle-curl.crt", **kwargs)
    # Instantiates a client
    client = vision.ImageAnnotatorClient(credentials=credentials)
    file_name = id_image_path

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.text_detection(image=image)
    print(response)

    # Convert the response to dictionary
    response = MessageToDict(response)
    # Convert to Json
    res_json = json.dumps(response)
    print(res_json)
    return res_json
