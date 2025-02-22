# Plant Disease Detection Web App

## Overview
This web application allows users to detect plant diseases by uploading an image of the plant. It utilizes multiple pre-trained deep learning models (.h5) integrated with the web interface to provide:
- **Plant Type Identification**
- **Disease Classification**
- **Recommended Precautions**
- **Suggested Fertilizers**
- **Text-to-Audio Functionality**

## Dataset
- **Total Images:** 53,000 plant images used for training and evaluation.

## Features
- **User-Friendly Interface:** Simple upload and predict functionality with a modern design.
- **Accurate Predictions:** Deep learning models (CNN, MobileNetV2, ShuffleNetV2, VGG-16, ResNet-50) for disease classification.
- **Practical Advice:** Displays relevant precautions and fertilizers for the detected disease.
- **Audio Output:** Converts prediction details to speech for better accessibility.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** TensorFlow (for model loading and prediction)
- **Deep Learning Models:** CNN, MobileNetV2, ShuffleNetV2, VGG-16, ResNet-50

## How to Run the App
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python app.py
   ```

5. Open `index.html` in your browser to use the web app.

## Project Structure
```
├── model/
│   └── plant_disease_model.h5
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── templates/
│   └── index.html
├── app.py
├── requirements.txt
└── README.md
```

## Usage
1. Upload an image of the plant leaf.
2. Click on the **Predict** button.
3. View the prediction details, including:
   - Plant type
   - Disease type
   - Suggested precautions
   - Recommended fertilizers
4. Use the **Speak Out** feature to hear the results.

## Contributing
Contributions are welcome. Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
