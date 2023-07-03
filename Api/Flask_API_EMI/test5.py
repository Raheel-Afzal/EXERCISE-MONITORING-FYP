from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return {"name":"Raheel"}

if __name__ == '__main__':
    app.run(host='192.168.10.4',port=8000)