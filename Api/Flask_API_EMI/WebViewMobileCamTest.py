# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/sendVideo', methods=['POST'])
# def receive_video():
#     try:
#         # Get video file from request
#         video_file = request.files['video']
#         # Process video file as needed (e.g. save to disk, perform video processing tasks)
#         # ...
#         video_file.save('../flaskProject' + video_file.filename)  # Change 'videos/' to the desired folder path

#         return jsonify({'message': 'Video received and processed successfully'})
#     except Exception as e:
#         return jsonify({'error': 'Failed to process video', 'details': str(e)}), 500

# if __name__ == '__main__':
#    app.run(host='192.168.10.3',port=8000)

# from flask import Flask, request, send_file

# app = Flask(__name__)

# @app.route('/upload', methods=['POST'])
# def upload():
#     video = request.files['video']
#     video.save('video.mp4')  # Save the video to a file or process it as needed

#     # Send the saved video back to the client
#     return send_file('video.mp4', attachment_filename='video.mp4')

# if __name__ == '__main__':
#     app.run(host='192.168.1.33', port=8000)


# from flask import Flask, request, send_file, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

# uploaded_video_path = None  # Variable to store the path of the uploaded video

# @app.route('/upload', methods=['POST'])
# def upload():
#     global uploaded_video_path

#     video = request.files['video']
#     print('video',video)
#     video.save('uploaded_video.mp4')  # Save the uploaded video to a file
#     uploaded_video_path = 'uploaded_video.mp4'  # Store the path of the uploaded video
#     print('uploaded_video_path',uploaded_video_path)
#     # Process the video as needed (e.g., store it, perform analysis, etc.)

#     return send_file(video, attachment_filename='video.mp4')
#     # Send a response indicating success
#     # return {'message': 'Video uploaded successfully'}


# if __name__ == '__main__':
#     app.run(host='192.168.1.33', port=8000)


# from flask import Flask, request, send_file, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

# @app.route('/upload', methods=['POST'])
# def upload():
#     video = request.files['video']
#     video.save('uploaded_video.mp4')  # Save the uploaded video to a file

#     # Process the video as needed (e.g., store it, perform analysis, etc.)

#     return send_file('uploaded_video.mp4', attachment_filename='video.mp4')

# if __name__ == '__main__':
#     app.run(host='192.168.1.33', port=8000)

# from flask import Flask, request, send_file, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

# @app.route('/upload', methods=['POST'])
# def upload():
#     try:
#         video = request.files['video']
#         video.save('uploaded_video.mp4')  # Save the uploaded video to a file

#         # Process the video as needed (e.g., store it, perform analysis, etc.)

#         return send_file('uploaded_video.mp4', attachment_filename='video.mp4')
#     except Exception as e:
#         print('Error uploading video:', str(e))
#         return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     app.run(host='192.168.1.33', port=8000)

from flask import Flask, Response, request
import cv2

app = Flask(__name__)


def generate_frames(video):
    
    cap = cv2.VideoCapture('../../Desktop/EXERCISES/PUSHUPS2.mp4')


  
    # Set video encoder and format
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter('output.mp4', fourcc, 25.0, (640, 480))

    # Process video frames from client and send back response
    while True:
        ret, img = cap.read()
       

        if not ret:
            break

        out.write(img)
    

        ret, buffer = cv2.imencode('.jpg', img)
        img = buffer.tobytes()  # encode as bytes
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

    # Release video capture and encoder
    cap.release()
    out.release()


@app.route('/upload', methods=['POST'])
def video():
    video = request.files['video']

    return Response(generate_frames(video), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host='192.168.1.41', port=8000)
