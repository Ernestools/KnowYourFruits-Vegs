from flask_mysqldb import MySQL
from Models.QuizModel import QuizModel

class QuizDataAccess:
    _table_name = "quiz_model"
    _cursor = None

    def __init__(self, mysql : MySQL):
        self._mysql = mysql
        self._cursor = mysql.connection.cursor()

    def insert(self, model : QuizModel):
        try:
            self._cursor.execute(self.insert_query(model))
            self._mysql.connection.commit()
            return True
        except Exception as e:
            print("Error while inserting entity of type QuizModel : " + str(e))
        return False
    
    def insert_query(self, model : QuizModel):
        return f"INSERT INTO {self._table_name} (id, label, image_url) VALUES ('{model.get_id()}', '{model.get_label()}', '{model.get_imageUrl()}')"
        
    