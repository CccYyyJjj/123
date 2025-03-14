import hashlib
import json
from time import time
from uuid import uuid4
from flask import Flask, jsonify, request


#区块链类
class Blockchain(object):
    def __init__(self):
        self.userdata = None
        self.chain = []
        #建立一个初始块
        self.new_block(previous_hash=1)

    # 新建块的方法
    def new_block(self, previous_hash=None):

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'user-data': self.userdata,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),

        }
        self.userdata = None
        self.chain.append(block)
        return block

    def update(self, str):
        self.userdata=str.decode()
        return self.last_block['index'] + 1

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def hash(block):
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()


app = Flask(__name__)

node_identifier = str(uuid4()).replace('-', '')

blockchain = Blockchain()

@app.route('/', methods=['GET'])
def bc():
    return "怎么给你发现这里的"

@app.route('/mine', methods=['GET'])
def mine():

    last_block = blockchain.last_block

    blockchain.update("world")

    previous_hash = blockchain.hash(last_block)
    block = blockchain.new_block(previous_hash)

    response = {
        'message': "New Block Forged",
        'index': block['index'],
        'user-data': block['user-data'],
        'previous_hash': block['previous_hash'],
    }
    return jsonify(response), 200

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    str = request.get_data()
    last_block = blockchain.last_block
    index = blockchain.update(str)
    previous_hash = blockchain.hash(last_block)
    block = blockchain.new_block(previous_hash)

    response = {'message': f'Transaction will be added to Block {index}'}
    return jsonify(response), 201

@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    print(blockchain.chain)
    return jsonify(response), 200

@app.route('/get_by_index', methods=['GET'])
def get_by_id():
    id = int(request.args.get('id'))
    response = {
        'chain': blockchain.chain[id]["user-data"],
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

