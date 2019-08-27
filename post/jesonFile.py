# import json
# res=json.loads(response)
# print(res['responses'][0]['textAnnotations'][1]['boundingPoly']['vertices'])

import os.path
import json
import nltk

def Similarity(var,fields=['Passpord Card no','Nationality','Surname','Given Names','Sex','Date of Birth','Place of Birth']):
    min=len(var)/3
    fieldMin=''
    for field in fields:
        if nltk.edit_distance(field, var)<=min:
            min=nltk.edit_distance(field, var)
            fieldMin=field
    return fieldMin

def call_google_ocr_api(id_image_path):
    file = open("res.json")
    res = file.read()
    file.close()
    return res


<<<<<<< HEAD
=======
def getSentenseplace(id_image_path):
    statment = []
    response = call_google_ocr_api(id_image_path)
    # all the fiels togezer
    res = json.loads(response)
    # print(res['responses'][0]['textAnnotations'][0]['description'])
    # statment = response[0]['textAnnotations'][0]['description'].split('\n')
    # the array that contains all the details mevulgan
    statment = json.dumps(res['responses'][0]['textAnnotations'][0]['description'])
    # array that contains the fields from the picture
    statment = statment.split("\\n")
    idfieldsplace = {}
    fields = ['Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth', 'Place of Birth']
    statment[0] = statment[0][1:]
    # !!!!!!!!!check spelling for the data that comes from ocr-esti
    # and organize the word
    sfield = res['responses'][0]['textAnnotations']
    sfield = sfield[1:]

    indexOfWord = 1
    index = 0
    for s in statment:
        print(s)
    print("the values..........................................................")
    # find the positions in the json filed for every field
    for s in statment:
        cnt = s.count(' ') + 1
        #     if s in fields
        # if(contains(s)==True) esti function:
        # idfields[fields[index]]=fieldvalue() elisheva function
        idfieldsplace[s] = indexOfWord
        indexOfWord += cnt
        index += 1
    for key, val in idfieldsplace.items():
        print("{} :{}".format(key, val), end="\n")


"""
>>>>>>> place in json
def getSentense(id_image_path):
    statment = []
    response = call_google_ocr_api(id_image_path)
    res = json.loads(response)
    # print(res['responses'][0]['textAnnotations'][0]['description'])
    # statment = response[0]['textAnnotations'][0]['description'].split('\n')
    statment = json.dumps(res['responses'][0]['textAnnotations'][0]['description'])
    # array that contains the fields from the picture
    statment = statment.split("\\n")
    idfields = {}
    fields = ['Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth', 'Place of Birth']
    statment[0] = statment[0][1:]
    # !!!!!!!!!check spelling for the data that comes from ocr-esti
    # and organize the word
    sfield = res['responses'][0]['textAnnotations']
<<<<<<< HEAD
    sfield = sfield[1:]

    for s in statment:
=======

    indexOfWord=0
    for s in statment:
        sfield = sfield[1:]
>>>>>>> place in json
        print(s)
    print("the values..........................................................")

    for s in statment:
        # print(s)
        index = 0
<<<<<<< HEAD
        for f in sfield:
            i = 0
=======
        #if containInFields(s):
        indexOfWord+=
        for f in sfield:
            i = 0
            found = 0
>>>>>>> place in json
            for c in s:
                # if c.isalpha():
                # print(c)
                if c == ' ':
<<<<<<< HEAD
=======
                    found = 1
>>>>>>> place in json
                    break
                if c != f['description'][i]:
                    i = -1
                    break
                i = i + 1
            # if s.find(f['description']) == 0:
            if i > 0:
                print(f['description'])
<<<<<<< HEAD
        index += 1

=======
            if found == 1:
                break
        index += 1
        # if dont have the corresponding field or faund it
>>>>>>> place in json
    #   sfield = [e for i, e in res['responses'][0]['textAnnotations'] if res['responses'][0]['textAnnotations'][e]['description'] == s]

    #  for i, index in sfield:
    #  print(sfield[index]['description'])
    # if res['responses'][0]['textAnnotations'][index]['description'] == s:
    # print(res['responses'][0]['textAnnotations'][index]['description'])
    # satatment=
    # idfields[s] = '12'
    # for k,v in idfields.items():
    #  print(k+'=>'+v)
<<<<<<< HEAD


if __name__ == "__main__":
    getSentense("C:\\Users\\This_User\\Pictures\\Camera Roll\\WIN_20190813_10_33_43_Pro.jp")
=======
"""

if __name__ == "__main__":
    getSentenseplace("C:\\Users\\This_User\\Pictures\\Camera Roll\\WIN_20190813_10_33_43_Pro.jp")
>>>>>>> place in json
