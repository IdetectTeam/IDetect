import json
def getSentenseplace(id_image_path):
    statment = []
    ### response = call_google_ocr_api(id_image_path)
    # all the fiels togezer
    ###res = json.loads
    FILENAME = r'C:\Users\מחשב\Documents\google project\IDetect\post\ocrresponse.json'
    f = open(FILENAME, 'r')
    res = f.read()
    f.close()

    # print(res['responses'][0]['textAnnotations'][0]['description'])
    # statment = response[0]['textAnnotations'][0]['description'].split('\n')
    # the array that contains all the details mevulgan
    #FILENAME = r'C:\Users\מחשב\Documents\google project\IDetect\post\ocrresponse.json'
    #f = open(FILENAME, 'w')
    #f.write(res)
    #f.close()
    # print(res['responses'][0]['textAnnotations'][0]['description'])
    #print(res['textAnnotations'][0]['description'])
    #print()
    statment = json.dumps(res['responses'][0]['textAnnotations'][0]['description'])
    print(statment)
    # array that contains the fields from the picture
    statment = statment.split("\\n")
    print(statment)
    idfieldsplaces = {}
    idfields = {}
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
    # find the positions in the json filed for every field
    for s in statment:
        cnt = s.count(' ') + 1
        #     if s in fields
        currentNameField = Similarity(s)
        if (currentNameField != ' '):
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
    getSentenseplace('C:\\Users\\tichnut\\passport.jpg')

"""
     place in json
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

    indexOfWord=0
    for s in statment:
        sfield = sfield[1:]
        print(s)
    print("the values..........................................................")

    for s in statment:
        # print(s)
        index = 0
  for f in sfield:
            i = 0
        #if containInFields(s):
        indexOfWord+=
        for f in sfield:
            i = 0
            found = 0
            for c in s:
                # if c.isalpha():
                # print(c)
                if c == ' ':
                    found = 1
                    break
                if c != f['description'][i]:
                    i = -1
                    break
                i = i + 1
            # if s.find(f['description']) == 0:
            if i > 0:
                print(f['description'])
        index += 1
            if found == 1:
                break
        index += 1
        # if dont have the corresponding field or faund it
    #   sfield = [e for i, e in res['responses'][0]['textAnnotations'] if res['responses'][0]['textAnnotations'][e]['description'] == s]

    #  for i, index in sfield:
    #  print(sfield[index]['description'])
    # if res['responses'][0]['textAnnotations'][index]['description'] == s:
    # print(res['responses'][0]['textAnnotations'][index]['description'])
    # satatment=
    # idfields[s] = '12'
    # for k,v in idfields.items():
    #  print(k+'=>'+v)


"""
