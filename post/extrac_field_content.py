import json
import math
import sys


def call_google_ocr_api():  # function to call to api - only for demoת Someone else Will write it
    file = open("res.json")
    res = json.loads(file.read())
    file.close()
    return res


def dist(point1, point2):  # Find distance between 2 vertices
    return math.sqrt(math.pow(point1['x'] - point2['x'], 2) + math.pow(point1['y'] - point2['y'], 2))


def search_for_start_value(start_key_x, words):  # Gets a field key index and returns the first word of its value
    closest_value = sys.maxsize
    value = ""
    for w in words:
        if words.index(w) != 0:
            w_vertices = w['boundingPoly']['vertices']
            start_word = find_top_left_corner(w_vertices)
            if start_word != None:
                distance = dist(start_key_x, start_word)
                if start_key_x['y'] < start_word['y'] and distance < closest_value:
                    closest_value = distance
                    value = w['description']
    return value


def find_in_full_text(start_value, all_words):  # Gets first word of field value and return all text
    start_ind = all_words.find(start_value)
    end_ind = all_words.find('\n', start_ind)
    all_value = all_words[start_ind:end_ind]
    return all_value


def find_top_left_corner(vertices):  # Return top left corner from vertices
    try:
        top1 = {'x': sys.maxsize, 'y': -1}
        top2 = {'x': sys.maxsize, 'y': -1}
        for v in vertices:
            if v['y'] > top1['y']:
                top2 = top1
                top1 = v
            elif v['y'] > top2['y']:
                top2 = v
        tops = [top1, top2]
        return min(tops, key=lambda v: v['x'])
    except:
        return None


def get_field_value(field_key_index, response):  # Gets a field key index and returns its value
    words = response['responses'][0]['textAnnotations']
    key_verteces = words[field_key_index]['boundingPoly']['vertices']
    start_key_x = find_top_left_corner(key_verteces)  # Search for top left corner from vertices
    start_value = search_for_start_value(start_key_x, words)  # Search for first word of field value
    # print(start_value)
    value = find_in_full_text(start_value, words[0]['description'])  # Search all field value in full text
    # print(value)
    return value


if __name__ == "__main__":
    res = call_google_ocr_api()
    get_field_value(10, res)
