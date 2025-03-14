from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 处理跨域请求


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': -1})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': -2})

    try:
        # 读取文件内容（示例：要求文件为文本文件）
        content = file.read().decode('utf-8')

        # 添加自定义验证逻辑（示例：检查内容非空）
        if not content.strip():
            return jsonify({'status': -3})

        return jsonify({'status': 1})
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'status': -4})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=5000)