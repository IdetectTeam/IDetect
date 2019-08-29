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