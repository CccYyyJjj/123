import requests
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

API_URL='http://127.0.0.1:5000/get_by_index'
ID=1

with open("private.pem", "rb") as f:
    private_key=RSA.import_key(f.read())

# 发送GET请求
response = requests.get(API_URL,{"id":ID})

# 获取JSON响应
data = response.json()
chain=data["chain"]
encoded_encrypted_data=chain

# 使用私钥创建解密器
cipher_de = PKCS1_OAEP.new(private_key)
decoded_encrypted_data = base64.b64decode(encoded_encrypted_data)
decrypted_data = cipher_de.decrypt(decoded_encrypted_data)
print(decrypted_data.decode())