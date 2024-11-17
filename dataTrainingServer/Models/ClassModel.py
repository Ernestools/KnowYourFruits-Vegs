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