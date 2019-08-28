import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

cred = {
  "type": "service_account",
  "project_id": "idetectsari",
  "private_key_id": "ee3681f1f2e9bce76e1fd0f1891400089ed6652b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClubjZhFsu2qPn\nhhwx714uwFm0DIzhDuaEM615T6zLYrjTlQFPvifiB4AOI2JYplJ5aEc8IYyfmICS\nol/Rk4MvkBtyxlGDepfBbQjDc8czkNC6x7HBEHEAghkKq5In151lpdIYubtORBsm\n7cpKZebOBUIoMFUJbaSpUf/5cevOPF1EVE4MuXJNt+j6hrIcXWMuu8n4LTBWvC82\nlIco3YJgFyprSZMI7SHAontmqWUbpWvLd0Z6aTOQHxuzR6tbzeu6Ja3FFr498tbf\nxSQioYdWW3jrSS5xs6U++bSGEKex+axOyAZ9lpeywziXc5hTtlGCe+C4S4oBx4Zd\nG/kUw97LAgMBAAECggEAS+QaQcXKKdEm6MGxzK40f41HJtvucauspVKy+JAjbXn2\ncLHWCWnngqrzmcXbZgQ4VW+K237zkiw4iK3B2kvGcfP4ld06e86aixG+xx6QVM1W\nwIntHR/F17k79XZvNj6XTfKbHQaEv0kR9AhFsD8s7CBdVOEZN/mVQ5KQ+W6RUP34\nAOgsPVg6QLgw6qhx4Uh28PEd3O/tx06jBHYPYITPYHVQJ/TPox6wfw2ZAiAY6Z9N\nn+V+j3EYlMOTQB2jJFEHQKviFuDE2A0bO+GUERN8OGs3sjeD1l/8h6fPDnvy0BP6\ndTIs/N7kaOEHdCbixyNYeSkCAwXfJEp/iRcOlgHYvQKBgQDQVJWB6Q+ZW4QtYhUf\nck6Fe5qcDWEyXmklS/Tpdhha8aYueVhEuU1of6h2/aOk//IsCo/QADJEWRA1ibSi\npARUaYCsM2KMsHjzlK6SrulZSABeZ1m7EkRaebVTNa1l+oSnGHfv++H1MDyi/WY1\n9Wm6FbulX5KqdjPC4Xx/EaoJ7QKBgQDLpXWxitxGvtsYgq9EKhh8a161WCH5KDRP\niKWC/Fpms2we/RICZfhLaP2H9X+4sq4zjt/TEmB1Zf9wLnRafeR5FTBYxQ9yQBz2\nk1xYM4EzfHzw/MDc/0s8foqdZ+NULOr5SR/wO1v0MQI5jWQJmZynWsqAJCpIhOFB\npntBp0eUlwKBgHR5pfEw/ZCvUvIQsWCYhwAoQCPZcys3D7BTjEVuymUmT9QR8eDS\nfU3cebK1UmXw11P6P7d6NKBz7xUPvZdk/iq3pcIhJIsmKyl8SjImar6I+/PL8qYd\nq2uuOkugaibm7n2Bt6TL/eQYqP4zkI7Ae/EXL4dhLN3zIjNl4DYnCRttAoGBAIG1\nxuwp5ToOcKEBBD+njGcbQHzDQQhhKkiKYdm3gKEvoStvx9vNNURbADlsDkkHTlu6\noiff6Z59NCExBZ1p2G+jJmM0SS1dVtVbcRMg4yd3IGGiq/lXhoVmmEXAGRTRc20K\nvZQXSu+Tk7Yyr8hJlnUmKBtMbb45HPzi3FkqAjbLAoGASIAUViSb75jhTGW0X0Es\nuXtY9ON0nb8gNG4kO3v/iDJJBKA5NfIQIioZNHXZ4J12MZUTexLlFRB0YH8tq9wO\nwKMFPlr0HO//0AIhg7ZyoSMdqU8hWBs+qLEpzLpG8Olx4BnX9EA4LgphnJd62/84\nAAT51SOCF4vw18yYi5obAEY=\n-----END PRIVATE KEY-----\n",
  "client_email": "idetect@idetectsari.iam.gserviceaccount.com",
  "client_id": "111205304791085687184",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/idetect%40idetectsari.iam.gserviceaccount.com"
}


# Instantiates a client
client = vision.ImageAnnotatorClient(credentials=cred)

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    r'C:\Users\tichnut\shmil.jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

# Performs label detection on the image file
response = client.label_detection(image=image)
labels = response.label_annotations

print('Labels:')
for label in labels:
    print(label.description)
