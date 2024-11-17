from DAO.ClassDataAccess import ClassDataAccess
from DAO.QuizDataAccess import QuizDataAccess
from Services.PredictionService import PredictionService
import os
from os import listdir
from uuid import uuid4
from Models.ClassModel import ClassModel
from Models.QuizModel import QuizModel

class DbInitService:

    _classes_dictionary = dict()

    def __init__(self, 
                 predictionService: PredictionService,
                 classDAO : ClassDataAccess, 
                 quizDAO : QuizDataAccess, 
                 testAssetsPath : str,
                 servePath : str):
        
        self._predictionService = predictionService
        self._classDAO = classDAO
        self._quizDAO = quizDAO
        self._test_assets_path = testAssetsPath
        self._serve_path = servePath

    def initialize_db(self):
        assets_folder = self._test_assets_path
        self.map_classes()

        for file in os.listdir(assets_folder):
            for image in os.listdir(f"{assets_folder}/{file}"):
                image_path = f"{assets_folder}/{file}/{image}"
                quiz = self._predictionService.predict(image_path)
                if quiz.get_label() != file:
                    continue
                self._quizDAO.insert(
                    QuizModel(
                        self._classes_dictionary[quiz.get_label()], 
                        f"{self._serve_path}/{file}/{image}", 
                        uuid4().__str__()
                        )
                    )

    def map_classes(self):
        classes = self._predictionService.get_classes()
        for element in classes:
            class_model = ClassModel(element, uuid4().__str__())
            self._classDAO.insert(class_model)
            self._classes_dictionary[element] = class_model.get_id()