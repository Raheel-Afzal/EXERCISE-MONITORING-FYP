from flask import Flask
from flask_socketio import SocketIO, emit
import base64

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('camera-frame')
def process_camera_frame(frame):
    # Process the received camera frame
    # Replace this with your own processing logic
    # For example, you can save the frame to disk or perform image analysis

    # Emit a response (optional)

    response = {'message': 'Frame received'}
    print(response)
    emit('response',response)

# @socketio.on('stream')
# def process_frame(frame_data):
#     print('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
#     # Process the received frame data
#     # Replace this with your actual logic to handle/process the frame
#     frame_bytes = base64.b64decode(frame_data)
#     # Do something with the frame bytes

#     # Send the processed frame back to the React Native application
#     emit('frame', frame_data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='192.168.0.120', port=5000)