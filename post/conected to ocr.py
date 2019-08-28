import json
from google.oauth2 import service_account
import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
credentials = service_account.Credentials. from_service_account_file("C:\\try project-739ea8757b20.json")


# Instantiates a client
client = vision.ImageAnnotatorClient(credentials=credentials)
file_name = 'C:\\Users\\ABRAHAM KAMAJI\\Downloads\\try5.jpg'

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

# Performs label detection on the image file
response = client.text_detection(image=image)
print(response)
