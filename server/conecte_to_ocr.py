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
    json_file_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_OCR')
    if json_file_path is None:
        raise Exception("please set GOOGLE_APPLICATION_CREDENTIALS_OCR variable to your google key path")
    service_account_info = json.load(open(json_file_path))
    credentials = service_account.Credentials.from_service_account_info(
        service_account_info)
    client = vision.ImageAnnotatorClient(credentials=credentials)
    content = base64_image_id
    content = base64.b64decode(content)  # send base64 of image in content
    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.text_detection(image)
    # print(response)

    # Convert the response to dictionary
    response = MessageToDict(response)
    # Convert to Json
    res_json = json.dumps(response)
    # print(res_json)
    return res_json
