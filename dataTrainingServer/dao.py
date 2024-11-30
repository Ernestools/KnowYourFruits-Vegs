from flask_mysqldb import MySQL
from models import ClassModel
from models import QuizModel


class ClassDataAccess:
    _table_name = "class_model"
    _cursor = None

    def __init__(self, mysql : MySQL):
        self._mysql = mysql
        self._cursor = mysql.connection.cursor()

    def insert(self, model : ClassModel):
        try:
            self._cursor.execute(self.insert_query(model))
            self._mysql.connection.commit()
            return True
        except Exception as e:
            print("Error while inserting entity of type ClassModel: " + str(e))
        return False
    
    def clear_all(self):
        try:
            self._cursor.execute(f"DELETE FROM {self._table_name}")
            self._mysql.connection.commit()
            return True
        except Exception as e:
            print("Error while clearing ClassModel table: " + str(e))
        return False

    
    def insert_query(self, model : ClassModel):
        return f"INSERT INTO {self._table_name} (id, label) VALUES ('{model.get_id()}', '{model.get_label()}')"
        

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
            print("Error while inserting entity of type QuizModel: " + str(e))
        return False
    
    def insert_query(self, model : QuizModel):
        return f"INSERT INTO {self._table_name} (id, label, image_url) VALUES ('{model.get_id()}', '{model.get_label()}', '{model.get_imageUrl()}')"
    

class UserDataAccess:
    _table_name = "user_model"
    _cursor = None

    def __init__(self, mysql : MySQL):
        self._mysql = mysql
        self._cursor = mysql.connection.cursor()

    def getAll(self):
        try:
            self._cursor.execute(self.select_query())
            return self._cursor.fetchall()
        except Exception as e:
            print("Error while reading entity of type User: " + str(e))
        return []
    
    def select_query(self):
        return f"SELECT * FROM {self._table_name}"
        
    