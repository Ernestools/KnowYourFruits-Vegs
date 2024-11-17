from flask import Flask
from flask_mysqldb import MySQL
import json
from DAO.ClassDataAccess import ClassDataAccess
from DAO.QuizDataAccess import QuizDataAccess
from Services.PredictionService import PredictionService
from Services.DbInitService import DbInitService
import os
from os import listdir

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'curious_kids_quiz'

test_assets_path = "../static/test"
model_path = "trained_model.h5"

mysql = MySQL(app)
predictionService = PredictionService("trained_model.h5", test_assets_path)

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