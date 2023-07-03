from flask import Flask, request, send_file, jsonify,send_from_directory
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

@app.route('/upload', methods=['POST'])
def upload():

    video = request.files['video']
    video.save('uploaded_video.mp4')  # Save the uploaded video to a file
    cap = cv2.VideoCapture('uploaded_video.mp4')
    start_video = cv2.VideoWriter('compressed_video.mp4',cv2.VideoWriter_fourcc(*'h264'),25,(150,300))
    while True:
        status,img = cap.read()

        if status==True:
            img = cv2.resize(img,(150,300))

            start_video.write(img)
        else:
            start_video.release()
            cap.release()
            cv2.destroyAllWindows()
            break
    
    

    # Send a response indicating success
    return {'message': 'Video uploaded successfully'}

@app.route('/getvideo',methods=['GET'])
def getVideo():
    return send_file('compressed_video.mp4','video/mp4')



if __name__ == '__main__':
    app.run(host='192.168.1.20', port=8000)