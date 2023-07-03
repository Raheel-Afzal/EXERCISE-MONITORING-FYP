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
            mpDraw.draw_landmarks(
                img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)

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


def findAngle(img, lm1, lm2, lm3, bodyAngle, direction, exercise_name, draw=True):
    # Get the landmarks
    x1, y1 = lm1[0], lm1[1]
    x2, y2 = lm2[0], lm2[1]
    x3, y3 = lm3[0], lm3[1]

    # Calculate Angle
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                         math.atan2(y1 - y2, x1 - x2))
    if angle < 0:
        angle += 360
        if angle > 180:
            angle = 360 - angle
    elif angle > 180:
        angle = 360 - angle

    # Draw
    if draw and bodyAngle == 'hipAngle':
        line_color = (0, 255, 0)  # Green color
        if exercise_name == 'tricepsKickBack':
            if angle < 120 or angle > 140:
                line_color = (0, 0, 255)  # Red color
        elif exercise_name == 'pushUps':
            if angle < 173:
                line_color = (0, 0, 255)  # Red color
        elif exercise_name == 'pushDowns':
            if angle < 170:
                line_color = (0, 0, 255)  # Red colo
        elif exercise_name == 'benchDips':
            if direction == 0 and angle > 130:
                line_color = (0, 0, 255)  # Red color
            if direction == 1 and angle < 100:
                line_color = (0, 0, 255)  # Red color

        cv2.line(img, (x1, y1), (x2, y2), line_color, 3)
        cv2.line(img, (x3, y3), (x2, y2), line_color, 3)

        cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
        cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
        cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)

        cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50),
                    cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)

    if draw and bodyAngle == 'armAngle':
        line_color = (0, 255, 0)  # Green color
        if exercise_name == 'tricepsKickBack':
            if direction == 0 and angle < 60:
                line_color = (0, 0, 255)  # Red color
            if direction == 1 and angle > 160:
                line_color = (0, 0, 255)  # Red color
        elif exercise_name == 'pushUps':
            if direction == 0 and angle < 60:
                line_color = (0, 0, 255)  # Red color
            if direction == 1 and angle > 170:
                line_color = (0, 0, 255)  # Red color
        elif exercise_name == 'pushDowns':
            if direction == 0 and angle < 60:
                line_color = (0, 0, 255)  # Red color
            if direction == 1 and angle > 160:
                line_color = (0, 0, 255)  # Red color
        elif exercise_name == 'benchDips':
            if direction == 1 and angle < 90:
                line_color = (0, 0, 255)  # Red color

        cv2.line(img, (x1, y1), (x2, y2), line_color, 3)
        cv2.line(img, (x3, y3), (x2, y2), line_color, 3)
        cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
        cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
        cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)
        cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50),
                    cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)

    elif draw and bodyAngle == 'legAngle':
        line_color = (0, 255, 0)  # Green color
        if angle < 171 and angle > 170:
            line_color = (0, 0, 255)  # Red color
        if angle < 120:
            line_color = (0, 0, 255)  # Red color

        cv2.line(img, (x1, y1), (x2, y2), line_color, 3)
        cv2.line(img, (x3, y3), (x2, y2), line_color, 3)

        cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
        cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
        cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
        cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)

        cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50),
                    cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)

    if bodyAngle == 'hipAngle':
        if exercise_name == 'tricepsKickBack':
            return angle, angle < 140
        elif exercise_name == 'pushUps':
            return angle, angle < 170
        elif exercise_name == 'pushDowns':
            return angle, angle < 170
        elif exercise_name == 'benchDips':
            return angle, True

    if bodyAngle == 'armAngle':
        if exercise_name == 'tricepsKickBack':
            return angle, angle < 160 or angle >= 50
        elif exercise_name == 'pushUps':
            return angle, angle < 60
        elif exercise_name == 'pushDowns':
            return angle, angle < 160 or angle >= 50
        elif exercise_name == 'benchDips':
            return angle, True
    if bodyAngle == 'legAngle':
        return angle, True


@app.route('/upload', methods=['POST'])
def upload():
    mpDraw = mp.solutions.drawing_utils
    mpPose = mp.solutions.pose
    pose = mpPose.Pose(False, 1, False, False, True, 0.5, 0.5)

    video = request.files['video']
    # Get the exercise name parameter
    exercise_name = request.form.get('exercise_name')

    video.save('uploaded_video.mp4')  # Save the uploaded video to a file
    cap = cv2.VideoCapture('uploaded_video.mp4')
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    size = (frame_width, frame_height)
    # start_video = cv2.VideoWriter('compressed_video.mp4',cv2.VideoWriter_fourcc(*'mp4v'),25,(600, 480))
    start_video = cv2.VideoWriter('compressed_video.mp4',
                                  cv2.VideoWriter_fourcc(*'h264'),
                                  24, size)

    count = 0
    direction = 0
    feedback = "Fix Form"
    form = 0
    while True:
        ret, img = cap.read()

        if not ret or img is None:  # Check if the read operation is successful and img is not empty
            break

        img, results = findPose(img, pose, mpDraw, mpPose)
        lmList = findPosition(img, results, False)

  #  1  # ---------------->>>>> PUSHUPS <<<<<------------------- #  1  #

        if len(lmList) != 0:
            if exercise_name == 'pushUps':
                shoulder = landMark(11, lmList)
                hip = landMark(23, lmList)
                ankle = landMark(27, lmList)
                elbow = landMark(13, lmList)
                wrist = landMark(15, lmList)

                shoulder_hip_ankle, correct_form_hip = findAngle(
                    img, shoulder, hip, ankle, 'hipAngle', direction, exercise_name)
                shoulder_elbow_wrist, correct_form_arm = findAngle(
                    img, shoulder, elbow, wrist, 'armAngle', direction, exercise_name)

                per = np.interp(shoulder_elbow_wrist, (90, 160), (0, 100))

                # Check to ensure right form before starting the program
                if shoulder_hip_ankle > 160:
                    form = 1

                # Check for full range of motion for the pushup
                if form == 1:
                    if per == 0:
                        if shoulder_elbow_wrist <= 90 and shoulder_hip_ankle > 170:
                            feedback = "Up"
                            if direction == 0:
                                count += 0.5
                                direction = 1
                        else:
                            if correct_form_hip:
                                feedback = "Fix Form"
                            else:
                                feedback = "Fix"

                    if per == 100:
                        if shoulder_elbow_wrist > 160 and shoulder_hip_ankle > 170:
                            feedback = "Down"
                            if direction == 1:
                                count += 0.5
                                direction = 0
                        else:
                            if correct_form_arm:
                                feedback = "Don't go too Down"
                            # if  correct_form_arm:
                            #     feedback = "Your arm is should be straight while up"
                            else:
                                feedback = "Fix Form"
                                form = 0

#  2  # ---------------->>>>> PUSH DOWN <<<<<------------------- #  2  #

            elif exercise_name == 'pushDowns':
                shoulder = landMark(12, lmList)
                hip = landMark(24, lmList)
                ankle = landMark(28, lmList)
                elbow = landMark(14, lmList)
                wrist = landMark(16, lmList)

                hipAngle = 'hipAngle'
                armAngle = 'armAngle'

                shoulder_hip_ankle, correct_form_hip = findAngle(
                    img, shoulder, hip, ankle, hipAngle, direction, exercise_name)
                shoulder_elbow_wrist, correct_form_arm = findAngle(
                    img, shoulder, elbow, wrist, armAngle, direction, exercise_name)

                per = np.interp(shoulder_elbow_wrist, (80, 170), (0, 100))

                # Check to ensure right form before starting the program
                if shoulder_hip_ankle > 170:
                    form = 1
                else:
                    feedback = "position your form"
                # Check for full range of motion for the pushup
                if form == 1:
                    # print('per1',per)
                    if per < 10:

                        if shoulder_elbow_wrist <= 80 and shoulder_hip_ankle > 170:
                            feedback = "forward"
                            if direction == 0:
                                count += 0.5
                                direction = 1
                        else:
                            feedback = "Fix Form"

                    if per > 90:
                        if shoulder_elbow_wrist > 160 and shoulder_hip_ankle > 170:
                            feedback = "Back"
                            if direction == 1:
                                count += 0.5
                                direction = 0
                        else:
                            feedback = "FixForm"

 #  3  # ---------------->>>>> TRICEPS KICKBACKS <<<<<------------------- #  3  #

            elif exercise_name == 'tricepsKickBack':
                shoulder = landMark(12, lmList)
                hip = landMark(24, lmList)
                ankle = landMark(28, lmList)
                elbow = landMark(14, lmList)
                wrist = landMark(16, lmList)

                shoulder_hip_ankle, correct_form_hip = findAngle(
                    img, shoulder, hip, ankle, 'hipAngle', direction, exercise_name)
                shoulder_elbow_wrist, correct_form_arm = findAngle(
                    img, shoulder, elbow, wrist, 'armAngle', direction, exercise_name)

                per = np.interp(shoulder_elbow_wrist, (50, 140), (0, 100))

                # Check to ensure right form before starting the program
                if shoulder_hip_ankle < 140:
                    form = 1

                # Check for full range of motion for the pushup
                if form == 1:
                    # print('per1',per)
                    if per < 10:

                        if shoulder_elbow_wrist >= 50 and shoulder_hip_ankle < 140:
                            feedback = "forward"
                            if direction == 0:
                                count += 0.5
                                direction = 1
                        else:
                            feedback = "Fix Form"

                    if per == 100:
                        if shoulder_elbow_wrist < 150 and shoulder_hip_ankle < 140:
                            feedback = "Back"
                            if direction == 1:
                                count += 0.5
                                direction = 0
                        else:
                            feedback = "Fix Form"
                            form = 0

  #  4  # ---------------->>>>> Squats <<<<<------------------- #  4  #

            elif exercise_name == 'squats':
                hip = landMark(23, lmList)
                knee = landMark(25, lmList)
                ankle = landMark(27, lmList)

                hip_knee_ankle, correct_form_arm = findAngle(
                    img, hip, knee, ankle, 'legAngle', direction, exercise_name)

                per = np.interp(hip_knee_ankle, (140, 170), (0, 100))

                if hip_knee_ankle > 170:
                    form = 1

                if form == 1:
                    if per == 0:
                        if hip_knee_ankle <= 140:
                            feedback = "Up"
                            if direction == 0:
                                count += 0.5
                                direction = 1
                        else:
                            feedback = "Too Short"

                    if per == 100:
                        if hip_knee_ankle > 170:
                            feedback = "Down"
                            if direction == 1:
                                count += 0.5
                                direction = 0
                        else:
                            feedback = "Too Short"
                            form = 0

 #  5  # ---------------->>>>> BenchDips <<<<<------------------- #  5  #

            elif exercise_name == 'benchDips':
                shoulder = landMark(12, lmList)
                hip = landMark(24, lmList)
                ankle = landMark(28, lmList)
                elbow = landMark(14, lmList)
                wrist = landMark(16, lmList)

                shoulder_hip_ankle, correct_form_hip = findAngle(
                    img, shoulder, hip, ankle, 'hipAngle', direction, exercise_name)
                shoulder_elbow_wrist, correct_form_arm = findAngle(
                    img, shoulder, elbow, wrist, 'armAngle', direction, exercise_name)
                per = np.interp(shoulder_elbow_wrist, (80, 170), (0, 100))

                # Check to ensure right form before starting the program
                if shoulder_hip_ankle < 120 and shoulder_hip_ankle > 100:
                    form = 1

                # Check for full range of motion for the pushup
                if form == 1:
                    # print('per1',per)
                    if per < 10:

                        if shoulder_elbow_wrist >= 80 and shoulder_hip_ankle < 120 and shoulder_hip_ankle > 100:
                            feedback = "forward"
                            if direction == 0:
                                count += 0.5
                                direction = 1
                        else:
                            feedback = "Fix Form"

                    if per > 90:
                        if shoulder_elbow_wrist > 160 and shoulder_elbow_wrist < 175 and shoulder_hip_ankle < 140 and shoulder_hip_ankle > 120:
                            feedback = "Back"
                            if direction == 1:
                                count += 0.5
                                direction = 0
                        else:
                            feedback = "Fix Form"

  # ---------------->>>>> Common Logic <<<<<-------------------

            # cv2.rectangle(img, (50, 50), (150, 150), (0, 255, 0), cv2.FILLED)
            # cv2.putText(img, str(int(count)), (80, 125),
            #             cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 5)
            # cv2.putText(img, feedback, (500, 150),
            #             cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            height, width, _ = img.shape
            rectangle_y = height - 50  # Distance from the bottom of the image
            rectangle_top_left = (0, rectangle_y)
            rectangle_bottom_right = (width, height)
            cv2.rectangle(img, rectangle_top_left, rectangle_bottom_right, (225, 105, 94), cv2.FILLED)
            
            # Update the coordinates based on the rectangle position and size
            text_x = rectangle_top_left[0] + 8  # Adjust the x-coordinate as needed
            text_y = rectangle_top_left[1] + 35  # Adjust the y-coordinate as needed

            # Place the first text inside the rectangle
            cv2.putText(img, 'Reps: '+ str(int(count)), (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

            # Update the coordinates for the second text
            feedback_x = rectangle_top_left[0] + 250  # Adjust the x-coordinate as needed
            feedback_y = rectangle_top_left[1] + 30  # Adjust the y-coordinate as needed

            # Place the second text inside the rectangle
            cv2.putText(img, 'Feed Back: ' + feedback, (feedback_x, feedback_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)


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
