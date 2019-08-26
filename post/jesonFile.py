# import json
# res=json.loads(response)
# print(res['responses'][0]['textAnnotations'][1]['boundingPoly']['vertices'])

import os.path
import json


def call_google_ocr_api(id_image_path):
    file = open("res.json")
    res = file.read()
    file.close()
    return res


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
    sfield = sfield[1:]

    for s in statment:
        print(s)
    print("the values..........................................................")

    for s in statment:
        # print(s)
        index = 0
        for f in sfield:
            i = 0
            for c in s:
                # if c.isalpha():
                # print(c)
                if c == ' ':
                    break
                if c != f['description'][i]:
                    i = -1
                    break
                i = i + 1
            # if s.find(f['description']) == 0:
            if i > 0:
                print(f['description'])
        index += 1

    #   sfield = [e for i, e in res['responses'][0]['textAnnotations'] if res['responses'][0]['textAnnotations'][e]['description'] == s]

    #  for i, index in sfield:
    #  print(sfield[index]['description'])
    # if res['responses'][0]['textAnnotations'][index]['description'] == s:
    # print(res['responses'][0]['textAnnotations'][index]['description'])
    # satatment=
    # idfields[s] = '12'
    # for k,v in idfields.items():
    #  print(k+'=>'+v)


if __name__ == "__main__":
    getSentense("C:\\Users\\This_User\\Pictures\\Camera Roll\\WIN_20190813_10_33_43_Pro.jp")
