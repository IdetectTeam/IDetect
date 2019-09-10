import base64

import pre_ocr_api
import post_ocr_api


def detect_id(base64_image_id):
    res = pre_ocr_api.pre_ocr(base64_image_id)
    result = post_ocr_api.get_fields_value(res)
    return result


if __name__ == "__main__":
    with open("D:\\הורדות\\id\\j.jpeg", "rb") as image_file:
        base64_bytes = base64.b64encode(image_file.read())
    detect_id(base64_bytes)
