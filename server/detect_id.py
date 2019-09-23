import base64
import json
import pre_ocr_api
import post_ocr_api


def detect_id(base64_image_id, card_config_path):
    res = pre_ocr_api.pre_ocr(base64_image_id)
    if res == {}:
        return '{}'
    with open(card_config_path) as config_file:
        config_fields = json.loads(config_file.read())
        result = post_ocr_api.get_fields_value(res, config_fields)
    return result


if __name__ == "__main__":
    with open("C:\\Users\\This_User\\Downloads\\passport (1).jpg", "rb") as image_file:
        base64_bytes = base64.b64encode(image_file.read())
    res = detect_id(base64_bytes, 'pasport_card_config.json')
    print(res)
