import json
import math
import sys


def find_top_left_corner(vertices):  # Return top left corner from vertices
    try:
        top1 = {'x': sys.maxsize, 'y': sys.maxsize}
        top2 = {'x': sys.maxsize, 'y': sys.maxsize}
        for v in vertices:
            if v['y'] < top1['y']:
                top2 = top1
                top1 = v
            elif v['y'] < top2['y']:
                top2 = v
        tops = [top1, top2]
        return min(tops, key=lambda v: v['x'])
    except:
        return None


def get_first_word(full_value):  # return first word of value
    ind = full_value.find(' ')
    if ind != -1:
        return full_value[:ind]
    return full_value


def find_index(first_word, words):  # return word index in ocr response
    ind = -1
    for w in words:
        ind = ind + 1
        if w['description'] == first_word:
            return ind


def dist(point1, point2):  # Find distance between 2 vertices
    return math.sqrt(math.pow(point1['x'] - point2['x'], 2) + math.pow(point1['y'] - point2['y'], 2))


def search_for_closest_value(start_key_top_left_corner,
                             words):  # Gets a field key index and returns the closest part of its value
    closest_value = sys.maxsize
    value = None
    for w in words:
        if words.index(w) != 0:
            w_vertices = w['boundingPoly']['vertices']
            start_word = find_top_left_corner(w_vertices)
            if start_word != None:
                distance = dist(start_key_top_left_corner, start_word)
                if start_key_top_left_corner['y'] < start_word['y'] and distance < closest_value:
                    closest_value = distance
                    value = w
    return value


def find_in_full_text(closest_value, all_words, start):  # Gets any word of field value and return all text
    if closest_value == '':
        return '', len(all_words), -1
    mid_ind = all_words.find(closest_value, start)
    if mid_ind == -1:
        return '', len(all_words), -1
    start_ind = all_words.rfind('\n', start, mid_ind) + 1
    end_ind = all_words.find('\n', mid_ind)
    all_value = all_words[start_ind:end_ind]
    return all_value, start_ind, mid_ind


def find_bottom_value(field_key_verteces, words):
    key_top_left_corner = find_top_left_corner(field_key_verteces)  # Search for top left corner from vertices
    return search_for_closest_value(key_top_left_corner, words)  # Search for closest word of field value


def get_filed_value(field_key_index, response, config_field):  # Gets a field key index and returns its value
    words = response['textAnnotations']
    all_text = words[0]['description']
    field_key_verteces = words[field_key_index]['boundingPoly']['vertices']
    if config_field == 'bottom':
        closest_word = find_bottom_value(field_key_verteces, words)
    closest_value = closest_word['description']
    value_min_y = min(closest_word['boundingPoly']['vertices'], key=lambda v: v['y'])['y']
    value_max_y = max(closest_word['boundingPoly']['vertices'], key=lambda v: v['y'])['y']
    start_search_ind = 0
    while start_search_ind < len(all_text):
        full_value, full_value_ind, closest_value_ind = find_in_full_text(closest_value, all_text,
                                                                          start_search_ind)  # Search all field value in full text
        if full_value == '':
            return ''
        if all_text[closest_value_ind - 1] in [' ', '\n'] and all_text[closest_value_ind + len(closest_value)] in [' ',
                                                                                                                   '\n']:
            first_word = get_first_word(full_value)
            first_word_ind = find_index(first_word, words)
            first_word_min_y = min(words[first_word_ind]['boundingPoly']['vertices'], key=lambda v: v['y'])['y']
            first_word_max_y = max(words[first_word_ind]['boundingPoly']['vertices'], key=lambda v: v['y'])['y']
            if value_min_y <= first_word_min_y <= value_max_y or first_word_min_y <= value_min_y <= first_word_max_y:  # the correct value found
                return full_value
            start_search_ind = full_value_ind + len(full_value)
        else:
            start_search_ind = closest_value_ind + len(closest_value)
    print(full_value)
    return ''
