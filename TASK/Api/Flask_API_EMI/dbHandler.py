import pyodbc
import datetime


class dbContext:
    def __init__(self):
        self.conn = pyodbc.connect(
            'DRIVER={SQL Server};SERVER=DESKTOP-ES2DJHB;DATABASE=ExerciseMonitoring;UID=sa;PWD=123')
        self.cursor = self.conn.cursor()

    def addExerciseLog(self, uid, body):
        query = "INSERT INTO exerciseLogs (uid,exerciseName,reps,time) VALUES (?, ?, ?, ?)"
        current_datetime = datetime.datetime.now()
        self.cursor.execute(
            query, (uid, body['exerciseName'], body['reps'], current_datetime))
        self.conn.commit()

    def addWrongPoseLog(self, uid, body):
        query = "INSERT INTO wrongPoseLogs(uid,atRep,wrongPosePic,time,direction,exerciseName,angleOne,angleTwo,wrongAngleOne,wrongAngleTwo,correctAngleOne,correctAngleTwo,bodyAngle,vertix1,vertix2,vertix3,vertix4,vertix5) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        current_datetime = datetime.datetime.now()
        self.cursor.execute(
            query, (uid,
                    body['atRep'],
                    body['wrongPosePic'],
                    current_datetime,
                    body['direction'],
                    body['exerciseName'],
                    body['angleOne'],
                    body['angleTwo'],
                    body['wrongAngleOne'],
                    body['wrongAngleTwo'],
                    body['correctAngleOne'],
                    body['correctAngleTwo'],
                    body['bodyAngle'],
                    body['vertix1'],
                    body['vertix2'],
                    body['vertix3'],
                    body['vertix4'],
                    body['vertix5']))
        self.conn.commit()
