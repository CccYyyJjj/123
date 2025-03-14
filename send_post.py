import requests
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64
import json

API_URL='http://http://10.33.83.197:5000/upload'

json_data={
    'id': 666,
    'exp': 666,
    'hp': 666,
    'money': 666
}

with open("public.pem", "rb") as f:
    public_key=RSA.import_key(f.read())

json_str=json.dumps(json_data)

# 使用公钥创建加密器
cipher_en = PKCS1_OAEP.new(public_key)
encrypted_data=cipher_en.encrypt(json_str.encode())
encoded_encrypted_data=base64.b64encode(encrypted_data)

response = requests.post(API_URL, data=encoded_encrypted_data)