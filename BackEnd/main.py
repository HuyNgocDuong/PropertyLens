from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Data
house_data = pd.read_csv('./Datasets/Melbourne housing data.csv')
house_data = house_data.dropna()
school_data = pd.read_csv('./Datasets/All Schools List 2018.csv')

# Load models
rf_model = joblib.load("RainForestRegression_Model.pkl")
classification_model = joblib.load("MultiClassClassification_Model.pkl")

# Root
@app.get("/")
async def root():
    return {"message": "Welcome to PropertyLens API"}

@app.post("/predict_price")
def predict_price(square_footage: float, bedrooms: int):
    # Use loaded model to make prediction
    prediction = rf_model.predict([[square_footage, bedrooms]])
    return {"predicted_price": prediction[0]}

@app.get("/unique_suburbs")
def get_unique_suburbs():
    # Assuming your dataset is loaded as `house_data`
    unique_suburbs = house_data['Suburb'].unique().tolist()
    return {"unique_suburbs": unique_suburbs}