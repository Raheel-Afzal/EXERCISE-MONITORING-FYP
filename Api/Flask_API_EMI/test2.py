from flask import Flask, request, Response
import cv2

app = Flask(__name__)

@app.route('/video_feed')
def video_feed():
    # Set up video capture from client
    cap = cv2.VideoCapture('../../Desktop/EXERCISES/PUSHUPS2.mp4')

    # Set video encoder and format
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter('output.mp4', fourcc, 25.0, (640, 480))

    # Process video frames from client and send back response
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()  # encode as bytes
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    # Release video capture and encoder
    cap.release()
    out.release()

@app.route('/',methods=['GET'])
def index():
    return 'Hello, World!'

if __name__ == '__main__':
   app.run(host='192.168.10.4',port=8000)
