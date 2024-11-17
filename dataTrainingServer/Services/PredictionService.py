from Models.QuizModel import QuizModel
import tensorflow as tf
import numpy as np
from uuid import uuid4


class PredictionService:

    _classes = None
    _testDirectoryPath = None

    def __init__(self, modelFilePath, testDirectoryPath):
        self._model = tf.keras.models.load_model(modelFilePath)
        self._testDirectoryPath = testDirectoryPath
        self.define_classes()

    
    def predict(self, imagePath) -> QuizModel:
        image = tf.keras.preprocessing.image.load_img(imagePath ,target_size=(64,64))
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])
        predictions = self._model.predict(input_arr)
        highestRatedIndex =  np.argmax(predictions)
        predictionString = self._classes[highestRatedIndex]
        return QuizModel(predictionString, imagePath, uuid4().__str__())
    
    def define_classes(self):
        test_set = tf.keras.utils.image_dataset_from_directory(
            self._testDirectoryPath,
            labels="inferred",
            label_mode="categorical",
            class_names=None,
            color_mode="rgb",
            batch_size=32,
            image_size=(64, 64),
            shuffle=True,
            seed=None,
            validation_split=None,
            subset=None,
            interpolation="bilinear",
            follow_links=False,
            crop_to_aspect_ratio=False,
            pad_to_aspect_ratio=False,
            data_format=None,
            verbose=True,
        )

        self._classes = test_set.class_names

    def get_classes(self):
        return self._classes