# Fruit and Vegetable Image Recognition

This project was made to run locally, the model is included and can be rebuilt using `main.py`. Make sure to download and extract the required data in the same directory. Link to the data: [https://www.kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition](https://www.kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition)

## What you need to install?
streamlit, tensorflow, numpy  
Run your cmd as administrator and copy paste the following commands:
```bash
pip install numpy
pip install tensorflow
pip install streamlit
```

## How to run this project?
First run the flask app then the spring boot app. The available spring apis can be
explored using swagger: after running the spring server, go to your browser and
type http://localhost:8082/swagger-ui/index.html
Make sure to check the spring application.properties file (in resources folder under src/main) and to change that absolute path you'll see there to match the one where you're keeping the test pictures. For those test pictures, create a folder and name it 'static', this is a shared folder between both servers, and it should be placed besides them just like this readme file (sorry for those complications but this stuff is going to change anyway so, never mind).
