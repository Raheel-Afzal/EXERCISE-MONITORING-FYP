from flask import Flask, send_file

app = Flask(__name__)

@app.route('/get_image', methods=['GET'])
def get_image():
    # Replace this with the path to your image file
    image_path = '../../Desktop/EXERCISES/exercise.png'

    # Send image file as response
    return send_file(image_path, mimetype='image/jpeg')

if __name__ == '__main__':
   app.run(host='192.168.10.4',port=8000)
