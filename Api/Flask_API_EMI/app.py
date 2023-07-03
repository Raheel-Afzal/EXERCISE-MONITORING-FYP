from flask import Flask, jsonify, request, Response
import cv2
import mediapipe as mp
import math
import numpy as np
import base64


app = Flask(__name__)

results=None
lmList = []

mpDraw = mp.solutions.drawing_utils
mpPose = mp.solutions.pose
pose = mpPose.Pose(False, 1, False,False, True,0.5, 0.5)

@app.route('/process_image', methods=['POST'])
def process_image():
    with app.app_context():
        cap = cv2.VideoCapture('C:\\Users\\rajar\\Desktop\\EXERCISES\\PUSHUPS.mp4')
        count = 0
        direction = 0
        form = 0
        feedback = "Fix Form"
        while cap.isOpened():
            ret, img = cap.read()
            if not ret:
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

                if shoulder_hip_ankle > 170:
                    form = 1

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
                            # form = 0
                response = {'feedBack': feedback, "count": count ,"lm":lmList}
                # yield jsonify(response)
                print(response)
                yield str(response).encode('utf-8')
        # Release resources
        cap.release()
        cv2.destroyAllWindows()
        # # Convert image to jpeg and encode to base64 string
        # _, buffer = cv2.imencode('.jpg', img)
        # img_str = base64.b64encode(buffer).decode('utf-8')

        # Return response with processed image
    return Response(process_image(), mimetype='application/octet-stream')

    # Release resources
    cap.release()
    cv2.destroyAllWindows()
    # # Convert image to jpeg and encode to base64 string
    # _, buffer = cv2.imencode('.jpg', img)
    # img_str = base64.b64encode(buffer).decode('utf-8')

    # Return response with processed image

def findPose (img,pose,mpDraw,mpPose, draw=False):
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = pose.process(imgRGB)

    if results.pose_landmarks:
        if draw:
            mpDraw.draw_landmarks(img,results.pose_landmarks,mpPose.POSE_CONNECTIONS)

    return img,results

def findPosition(img,results, draw=False):
    lmList=[]
    if results.pose_landmarks:
        for id, lm in enumerate(results.pose_landmarks.landmark):
            #finding height, width of the image printed
            h, w, c = img.shape
            #Determining the pixels of the landmarks
            cx, cy = int(lm.x * w), int(lm.y * h)
            lmList.append([id, cx, cy])
            if draw:
                cv2.circle(img, (cx, cy), 5, (255,0,0), cv2.FILLED)
    return lmList

# def findAngle(img, p1, p2, p3,lmList, draw=True):
def findAngle(img,lm1,lm2,lm3, draw=True):
    #Get the landmarks
    x1, y1 = lm1[0], lm1[1]
    x2, y2 = lm2[0], lm2[1]
    x3, y3 = lm3[0], lm3[1]

 #Calculate Angle
    angle = math.degrees(math.atan2(y3-y2, x3-x2) -
                         math.atan2(y1-y2, x1-x2))
    if angle < 0:
        angle += 360
        if angle > 180:
            angle = 360 - angle
    elif angle > 180:
        angle = 360 - angle
    # print(angle)

def landMark(point,lmList):
    return lmList[point][1:]



# def findAngle(img, p1, p2, p3,lmList, draw=True):
def findAngle(img,lm1,lm2,lm3, draw=True):
    #Get the landmarks
    x1, y1 = lm1[0], lm1[1]
    x2, y2 = lm2[0], lm2[1]
    x3, y3 = lm3[0], lm3[1]
    # Calculate the angle between three points
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                         math.atan2(y1 - y2, x1 - x2))
    if angle < 0:
        angle += 360

    # Drawing the angle lines and points on image
    if draw:
        cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
        cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
        cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)

    return angle


if __name__ == '__main__':
    with app.app_context():
        # perform actions that require the application context here
        app.run()