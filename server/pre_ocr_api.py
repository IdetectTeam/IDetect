from PIL import Image
import os.path
import json
import numpy as np
import math
import conecte_to_ocr
import base64
from io import BytesIO


# def call_google_ocr_api(id_image_path):  # function to call to api - only for demoת Someone else Will write it
#     file = open("try7.json")
#     res = file.read()
#     file.close()
#     return res


def dest(point1, point2):  # Find destination between 2 vertices
    return math.sqrt(math.pow(point1['x'] - point2['x'], 2) + math.pow(point1['y'] - point2['y'], 2))


def find_points(
        some_word_vertices):  # Finding 2 adjacent vertices with the greatest distance by which the degrees are calculated
    min_x = min(some_word_vertices, key=lambda v: v['x'])
    min_y = min(some_word_vertices, key=lambda v: v['y'])
    max_y = max(some_word_vertices, key=lambda v: v['y'])
    x = dest(min_x, min_y)
    y = dest(min_x, max_y)
    if min_x['x'] == min_y['x']:
        if abs(max_y['x'] - min_y['x']) < abs(min_y['y'] - max_y['y']):
            return min_x, min_x
        return {}, {}
    if dest(min_x, min_y) > dest(min_x, max_y):
        return min_x, min_y
    return min_x, max_y


def find_rotation_degree(some_word_vertices):  # Calculate the degrees to rotate the image
    point1, point2 = find_points(some_word_vertices)
    if point1 == {}:
        return 0
    if point1 == point2:
        return 90
    a = abs(point1['y'] - point2['y'])
    b = abs(point1['x'] - point2['x'])
    degrees = math.degrees(math.atan(a / b))
    if point1['y'] < point2['y']:
        return degrees
    return 360-degrees;


def find_word_to_check(words):
    for w in words:
        if len(w['description']) == 9:
            print(w['description'])
            return w['boundingPoly']['vertices']
    return []


def pre_ocr(base64_image_id):  # pre ocr processing
    response = conecte_to_ocr.call_google_ocr_api(base64_image_id)  # try to detect text before rotate img
    res = json.loads(response)
    if res == {}:
        return {}
    some_word_vertices = find_word_to_check(res['textAnnotations'])  # search for word to get the
    # verteces use them in degree calculate.
    if some_word_vertices == []:
        return response
    print(some_word_vertices)
    id_img = Image.open(BytesIO(base64.b64decode(base64_image_id)))  # Create an Image object from an id_image_path
    degrees = find_rotation_degree(some_word_vertices)
    final_image = id_img.rotate(degrees)  # rotate the image
    buffered = BytesIO()
    final_image.save(buffered, format=id_img.format)
    final_base64_img = base64.b64encode(buffered.getvalue())
    if degrees != 0:
        return conecte_to_ocr.call_google_ocr_api(final_base64_img)  #  call ocr api with aligned image.
    return response



if __name__ == "__main__":
    # with open("C:\\Users\\This_User\\Downloads\\try.jpg", "rb") as image_file:
    #     base64_bytes = base64.b64encode(image_file.read())
    # img = Image.open("C:\\Users\\This_User\\Downloads\\try.jpg")
    # buffered = BytesIO()
    # img.save(buffered, format=img.format)
    # img_str = base64.b64encode(buffered.getvalue())
    # print("")
    with open("C:\\Users\\This_User\\Downloads\\try7.png", "rb") as image_file:
        base64_bytes = base64.b64encode(image_file.read())
    base64_image_id = base64_bytes.decode('UTF-8')
    # base64_image_id = 'data:image/webp;base64,'+base64_image_id
    res = pre_ocr(base64_bytes)
    print((""))
