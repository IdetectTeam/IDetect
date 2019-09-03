import json
from google.oauth2 import service_account
import io
import os
# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
from google.protobuf.json_format import MessageToDict
import base64

from google.api_core.grpc_helpers import create_channel


def call_google_ocr_api(base64_image_id):
    credentials = service_account.Credentials.from_service_account_file(
        'C:\\Users\\This_User\\IDetect-0096da03810c.json')
    # create_channel(target, credentials=None, scopes=None, ssl_credentials="C:\ProgramData\NetFree\CA\netfree-ca-bundle-curl.crt", **kwargs)
    # Instantiates a client
    client = vision.ImageAnnotatorClient(credentials=credentials)
    content = base64_image_id
    content = base64.b64decode(content)# send base64 of image in content
    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.text_detection(image)
    print(response)

    # Convert the response to dictionary
    response = MessageToDict(response)
    # Convert to Json
    res_json = json.dumps(response)
    print(res_json)
    return res_json
