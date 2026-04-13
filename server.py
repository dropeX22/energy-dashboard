from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_store = []

@app.route('/energy', methods=['GET'])
def get_data():
    return jsonify(data_store)

@app.route('/energy', methods=['POST'])
def add_data():
    data = request.json
    data_store.append(data)
    return {"status": "ok"}

if __name__ == '__main__':
    app.run(debug=True)