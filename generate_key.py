from Crypto.PublicKey import RSA

# 生成公私钥
key = RSA.generate(1024)
public_key = key.public_key().export_key("PEM")
private_key = key.export_key("PEM")

# 保存公私钥
with open("public.pem", "wb") as f:
    f.write(public_key)

with open("private.pem", "wb") as f:
    f.write(private_key)

