from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import json
from DAO.ClassDataAccess import ClassDataAccess
from DAO.QuizDataAccess import QuizDataAccess
from Services.PredictionService import PredictionService
from Services.DbInitService import DbInitService
import face_recognition
import os
import numpy as np
from flask_cors import CORS, cross_origin
import cv2;
from PIL import Image
from io import BytesIO

app = Flask(__name__)
cors = CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create folder if not exists
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'curious_kids_quiz'

test_assets_path = "../static/test"
model_path = "trained_model.h5"

mysql = MySQL(app)
predictionService = None#PredictionService("trained_model.h5", test_assets_path)

@app.route("/")
def hello_world():
    return json.dumps(__name__)

@app.get("/init/db")
def initialize_db():
    try:
        DbInitService(
            predictionService,
            ClassDataAccess(mysql),
            QuizDataAccess(mysql),
            test_assets_path,
            "static/test"
        ).initialize_db()
        return ('', 200)
    except Exception as e:
        return (f'Internal Server Error {e}', 500)


naycem_image = face_recognition.load_image_file("naycem.jpg")
naycem_face_encoding = face_recognition.face_encodings(naycem_image)[0]

# Load a second sample picture and learn how to recognize it.
rima_image = face_recognition.load_image_file("rima.jpg")
rima_face_encoding = face_recognition.face_encodings(rima_image)[0]

known_face_encodings = [
    naycem_face_encoding,
    rima_face_encoding
]

known_face_names = [
    "Memory",
    "Sunny Kid"
]

@app.route('/recognize', methods=['POST'])
def upload_file():
    try:
        if 'frame' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        frame = request.files['frame']
        
        if frame.filename == '':
            return jsonify({"error": "No file selected"}), 400

        img = Image.open(frame.stream)
        rgb_image = img.convert('RGB')
        rgb_array = np.asarray(rgb_image)
        
        print(type(rgb_array))
        print(rgb_array.shape)
        
        # Save file to the defined folder
        # file_path = os.path.join(app.config['UPLOAD_FOLDER'], frame.filename)
        # frame.save(file_path)
        # return jsonify({"message": f"File {file.filename} uploaded successfully!"}), 200


        face_locations = []
        face_encodings = []
        face_names = []

        face_locations = face_recognition.face_locations(rgb_array)
        face_encodings = face_recognition.face_encodings(rgb_array, face_locations)

        face_names = []

        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            # # If a match was found in known_face_encodings, just use the first one.
            # if True in matches:
            #     first_match_index = matches.index(True)
            #     name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)

        return jsonify({"message": f"{face_names}"}), 200
    
    except Exception as e:
        return jsonify({str(e)}), 400


