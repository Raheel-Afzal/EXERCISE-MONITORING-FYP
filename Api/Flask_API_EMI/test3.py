from flask import Flask, send_file

app = Flask(__name__)

@app.route('/video')
def serve_video():
    video_path = 'C:\\Users\\rajar\\Desktop\\EXERCISES\\PUSHUPS.mp4'
    return send_file(video_path, mimetype='video/mp4')
