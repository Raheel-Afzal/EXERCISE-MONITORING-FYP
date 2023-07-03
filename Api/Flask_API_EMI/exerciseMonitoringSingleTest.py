from flask import Flask, request, send_file
from flask_cors import CORS
import cv2
import mediapipe as mp
import math
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins

lmList = []

def findPose(img, pose, mpDraw, mpPose, draw=False):
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(imgRGB)

    if results.pose_landmarks:
        if draw:
            mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)

    return img, results

def findPosition(img, results, draw=False):
    lmList = []
    if results.pose_landmarks:
        for id, lm in enumerate(results.pose_landmarks.landmark):
            # Finding height, width of the image printed
            h, w, c = img.shape
            # Determining the pixels of the landmarks
            cx, cy = int(lm.x * w), int(lm.y * h)
            lmList.append([id, cx, cy])
            if draw:
                cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
    return lmList

def landMark(point, lmList):
    return lmList[point][1:]

def findAngle(img, lm1, lm2, lm3, draw=True):
    # Get the landmarks
    x1, y1 = lm1[0], lm1[1]
    x2, y2 = lm2[0], lm2[1]
    x3, y3 = lm3[0], lm3[1]

    # Calculate Angle
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0:
        angle += 360
        if angle > 180:
            angle = 360 - angle
    elif angle > 180:
        angle = 360 - angle

    # Draw
    if draw:
        cv2.line(img, (x1, y1), (x2, y2), (255, 255, 255), 3)
        cv2.line(img, (x3, y3), (x2, y2), (255, 255, 255), 3)
        cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
        cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
        cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)

        cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
    return angle

@app.route('/upload', methods=['POST'])
def upload():
    mpDraw = mp.solutions.drawing_utils
    mpPose = mp.solutions.pose
    pose = mpPose.Pose(False, 1, False, False, True, 0.5, 0.5)

    video = request.files['video']
    
    video.save('uploaded_video.mp4')  # Save the uploaded video to a file
    cap = cv2.VideoCapture('uploaded_video.mp4')
    start_video = cv2.VideoWriter('compressed_video.mp4',cv2.VideoWriter_fourcc(*'h264'),25,(150,300))

    while True:
        ret, img = cap.read()

        if not ret or img is None:  # Check if the read operation is successful and img is not empty
            break

        img, results = findPose(img, pose, mpDraw, mpPose)
        lmList = findPosition(img, results, False)

        if len(lmList) != 0:
            shoulder = landMark(11, lmList)
            hip = landMark(23, lmList)
            ankle = landMark(27, lmList)
            elbow = landMark(13, lmList)
            wrist = landMark(15, lmList)

            shoulder_hip_ankle = findAngle(img, shoulder, hip, ankle)
            shoulder_elbow_wrist = findAngle(img, shoulder, elbow, wrist)

            per = np.interp(shoulder_elbow_wrist, (90, 160), (0, 100))

            # Check to ensure right form before starting the program
            form = 0
            if shoulder_hip_ankle > 170:
                form = 1

            # Check for full range of motion for the pushup
            count = 0
            direction = 0
            feedback = "Fix Form"
            if form == 1:
                if per == 0:
                    if shoulder_elbow_wrist <= 90 and shoulder_hip_ankle > 170:
                        feedback = "Up"
                        if direction == 0:
                            count += 0.5
                            direction = 1
                    else:
                        feedback = "Fix Form"

                if per == 100:
                    if shoulder_elbow_wrist > 160 and shoulder_hip_ankle > 170:
                        feedback = "Down"
                        if direction == 1:
                            count += 0.5
                            direction = 0
                    else:
                        feedback = "Fix Form"

            cv2.rectangle(img, (50, 50), (150, 150), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (80, 125), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 5)
            cv2.putText(img, feedback, (500, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            img = cv2.resize(img, (150, 300))
            start_video.write(img)
        else:
            break

    start_video.release()
    cap.release()

    # Send a response indicating success
    return {'message': 'Video uploaded successfully'}

@app.route('/getvideo', methods=['GET'])
def getVideo():
    return send_file('compressed_video.mp4', 'video/mp4')

if __name__ == '__main__':
    app.run(host='192.168.1.9', port=8000)
