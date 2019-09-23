import os.path
import json
import nltk
import extrac_field_content
import conecte_to_ocr


def similarity(var, fields=['Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth',
                            'Place of Birth']):  # gets some string and returns the field name similar to it if any
    min = len(var) / 3
    field_min = ' '
    for field in fields:
        if nltk.edit_distance(field, var) <= min or field.__contains__(var):
            min = nltk.edit_distance(field, var)
            field_min = field
    return field_min


def get_fields_value(response,config_fileds):
    res = response
    res = json.loads(res)
    statement = json.dumps(res['textAnnotations'][0]['description'])
    # array that contains the fields from the image
    statement = statement.split("\\n")
    id_fields_places = {}
    id_fields = {}
    fields = config_fileds.keys()
    statement[0] = statement[0][1:]
    # and organize the word
    sfield = res['textAnnotations']
    sfield = sfield[1:]
    indexOfWord = 1
    index = 0
    # find the positions in the json filed for every field
    for s in statement:
        cnt = s.count(' ') + 1
        currentNameField = similarity(s.split('/')[0], fields) #take first field description
        if currentNameField == ' ' and s.split('/')[0] == 'Passpord Card no':
            currentNameField = similarity('Passpord no', fields)
        if currentNameField != ' ':  # current 's' is field key
            if cnt > 1:
                currentNameF = s.find(currentNameField)
                if currentNameF > 0:
                    indexOfWord += currentNameF - 1
                    cnt -= currentNameF - 1
            id_fields[currentNameField] = extrac_field_content.get_filed_value(indexOfWord, res,config_fileds[currentNameField])
            id_fields_places[currentNameField] = indexOfWord
        indexOfWord += cnt
        index += 1
    print("the fields .........................................................")
    for key, val in id_fields_places.items():
        print("{} :{}".format(key, val), end = "\n")
    print("the positions........................................................")
    for key, val in id_fields.items():
        print("{} :{}".format(key, val), end="\n")
    id_fields = json.dumps(id_fields)
    print(id_fields)
    return id_fields


if __name__ == "__main__":
    # getSentenseplace('C:\\Users\\מחשב\\Pictures\\Camera Roll\\sheyna.jpg')
    get_fields_value("C:\\Users\\This_User\\Downloads\\sheyna.jpg")
