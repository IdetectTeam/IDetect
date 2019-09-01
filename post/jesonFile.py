# import json
# res=json.loads(response)
# print(res['responses'][0]['textAnnotations'][1]['boundingPoly']['vertices'])

import os.path
import json
import nltk
import extrac_field_content
import conecte_to_ocr


def Similarity(var, fields=['Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth',
                            'Place of Birth']):
    min = len(var) / 3
    fieldMin = ' '
    for field in fields:
        if nltk.edit_distance(field, var) <= min or field.__contains__(var):
            min = nltk.edit_distance(field, var)
            fieldMin = field
    return fieldMin


def call_google_ocr_api(id_image_path):
    res = conecte_to_ocr.call_google_ocr_api(id_image_path)
    return res


def getSentenseplace(id_image_path):
    statment = []
    response = call_google_ocr_api(id_image_path)
    # all the fiels togezer
    ###res = json.loads
    res = response
    # print(res['responses'][0]['textAnnotations'][0]['description'])
    # statment = response[0]['textAnnotations'][0]['description'].split('\n')
    # the array that contains all the details mevulgan
    FILENAME = r'D:\google\google cloud\My Project 13006-213d69c6a9b9.json'
    f = open(FILENAME, 'w')
    f.write(res)
    f.close()
    res = json.loads(res)
    # print(res['responses'][0]['textAnnotations'][0]['description'])
    # print(res['textAnnotations'][0]['description'])
    # print()
    statment = json.dumps(res['textAnnotations'][0]['description'])
    print(statment)
    # array that contains the fields from the picture
    statment = statment.split("\\n")
    print()
    idfieldsplaces = {}
    idfields = {}
    # fields = ['Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth', 'Place of Birth']
    fields = ['Passpord no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth', 'Place of Birth']
    statment[0] = statment[0][1:]
    # !!!!!!!!!check spelling for the data that comes from ocr-esti
    # and organize the word
    sfield = res['textAnnotations']
    sfield = sfield[1:]

    indexOfWord = 1
    index = 0
    for s in statment:
        print(s)
    # find the positions in the json filed for every field
    for s in statment:
        cnt = s.count(' ') + 1
        #     if s in fields
        currentNameField = Similarity(s.split('/')[0],fields)

        if (currentNameField != ' '):
            if cnt > 1:
                currentNameF = s.find(currentNameField)
                if currentNameF > 0:
                    indexOfWord += currentNameF-1
                    cnt -= currentNameF-1
            idfields[currentNameField] = extrac_field_content.get_filed_value(indexOfWord, res)
            idfieldsplaces[currentNameField] = indexOfWord
        indexOfWord += cnt
        index += 1
    print("the fields .........................................................")
    for key, val in idfieldsplaces.items():
        print("{} :{}".format(key, val), end="\n")
    print("the positions........................................................")
    for key, val in idfields.items():
        print("{} :{}".format(key, val), end="\n")
    idfields = json.dumps(idfields)
    print(idfields)


if __name__ == "__main__":
    # getSentenseplace('C:\\Users\\מחשב\\Pictures\\Camera Roll\\sheyna.jpg')
    getSentenseplace('C:\\Users\\tichnut\\passport.jpg')

