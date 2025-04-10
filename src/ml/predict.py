import os
import sys
# Example: inside `predict.py` or `main.py`
from flask import Flask
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
# Suppress TensorFlow INFO logs (optional)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Compute the absolute path to the model file relative to this file
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "model", "sugarcane_model.h5")

if not os.path.exists(model_path):
    print("Model file not found at:", model_path)
    sys.exit(1)

model = load_model(model_path)
class_names = ['Healthy', 'Mosaic', 'RedRot', 'Rust', 'Yellow']

def predict_image(img_path):
    # Load and preprocess the image to match training
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    predictions = model.predict(img_array)
    return class_names[np.argmax(predictions)]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_path>")
        sys.exit(1)
    prediction = predict_image(sys.argv[1])
    print(prediction, flush=True)
