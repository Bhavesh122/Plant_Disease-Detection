from flask import Flask, request, jsonify, render_template, redirect, url_for
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os
import uuid

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MODEL_PATH = 'plant_model.h5'
model = load_model(MODEL_PATH)

with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

disease_info = {
    "Apple___Apple_scab": {
        "plant_type": "Apple",
        "disease_type": "Apple Scab",
        "precautions": ["Prune trees", "Remove debris", "Use resistant varieties"],
        "fertilizers": ["Mancozeb", "Captan"]
    },
    "Potato___Early_blight": {
        "plant_type": "Potato",
        "disease_type": "Early Blight",
        "precautions": ["Crop rotation", "Avoid overhead irrigation"],
        "fertilizers": ["Chlorothalonil", "Mancozeb"]
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}.jpg")
    file.save(file_path)

    img = preprocess_image(file_path)
    predictions = model.predict(img)
    predicted_index = np.argmax(predictions, axis=1)[0]
    class_names = list(class_indices.keys())

    predicted_class = class_names[predicted_index]
    info = disease_info.get(predicted_class, {
        "plant_type": "Unknown",
        "disease_type": "Unknown",
        "precautions": ["No data available."],
        "fertilizers": ["No data available."]
    })

    return render_template('result.html', info=info)

if __name__ == '__main__':
    app.run(debug=True)