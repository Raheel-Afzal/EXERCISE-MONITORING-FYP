from flask import Flask, Response
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

    # Release video capture and encoder
    cap.release()
    out.release()

    # Send the video file as a response
    return Response(generate(), mimetype='video/mp4')

def generate():
    with open('output.mp4', 'rb') as f:
        data = f.read(1024)
        while data:
            yield data
            data = f.read(1024)

if __name__ == '__main__':
    app.run(host='192.168.10.5',port=8000)
