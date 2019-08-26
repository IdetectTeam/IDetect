from PIL import Image
import os.path
import json
import numpy as np
import math


def call_google_ocr_api(id_image_path):  # function to call to api - only for demoת Someone else Will write it
    file = open("try7.json")
    res = file.read()
    file.close()
    return res


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
    return degrees


def find_word_to_check(words):
    for w in words:
        if len(w['description']) == 9:
            print(w['description'])
            return w['boundingPoly']['vertices']
    return []


def pre_ocr(id_image_path):
    response = call_google_ocr_api(id_image_path)  # try to detect text before rotate img
    res = json.loads(response)
    some_word_vertices = find_word_to_check(res['responses'][0]['textAnnotations'])  # search for word to get the
    # vertexes use them in degree calculate.
    print(some_word_vertices)
    id_img = Image.open(id_image_path)  # Create an Image object from an id_image_path
    degrees = find_rotation_degree(some_word_vertices)
    final_image = id_img.rotate(degrees)  # rotate the image
    final_image.show()
    if degrees != 0:
        return call_google_ocr_api(final_image)  # Now, call ocr api with aligned image.
    return response


if __name__ == "__main__":
    pre_ocr("C:\\Users\\This_User\\Downloads\\try7.png")
