class ClassModel:

    def __init__(self, label, id = ''):
        self._label = label
        self._id = id

    def get_label(self):
        return self._label
    
    def get_id(self):
        return self._id
    
    def set_label(self, label):
        self._label = label

    def set_id(self, id):
        self._id = id


class QuizModel(dict):

    def __init__(self, label, imageUrl, id = ''):
        dict.__init__(self, label = label, imageUrl = imageUrl, id = id)
        self._label = label
        self._imageUrl = imageUrl
        self._id = id

    def get_label(self):
        return self._label
    
    def get_imageUrl(self):
        return self._imageUrl
    
    def get_id(self):
        return self._id
    
    def set_label(self, label):
        self._label = label

    def set_imageUrl(self, imageUrl):
        self._imageUrl = imageUrl

    def set_id(self, id):
        self._id = id

    
        

    