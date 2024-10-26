from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Tuple
from pydantic import BaseModel, Field
import joblib
import pandas as pd

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # URL of React application
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

# Get a unique suburb, used for search box
@app.get("/unique_suburbs")
def get_unique_suburbs():
    # Assuming your dataset is loaded as `house_data`
    unique_suburbs = house_data['Suburb'].unique().tolist()
    return {"unique_suburbs": unique_suburbs}

# House Filter

class HouseFilter(BaseModel): # Pydantic for Housefilter
    suburb: Optional[str] = Field(None, description="Suburb to filter by")
    bedrooms: Optional[int] = Field(None, ge=1, description="Number of bedrooms")
    bathrooms: Optional[int] = Field(None, ge=1, description="Number of bathrooms")
    price_range: Optional[Tuple[float, float]] = Field(None, description="Price range as (min, max)")
    
@app.post("/filter_houses")
def filter_houses(filter: HouseFilter):
    filtered_data = house_data

    if filter.suburb:
        filtered_data = filtered_data[filtered_data['Suburb'] == filter.suburb]
    if filter.bedrooms:
        filtered_data = filtered_data[filtered_data['Bedroom2'] == filter.bedrooms]
    if filter.bathrooms:
        filtered_data = filtered_data[filtered_data['Bathroom'] == filter.bathrooms]
    if filter.price_range:
        min_price, max_price = filter.price_range
        filtered_data = filtered_data[(filtered_data['Price'] >= min_price) & (filtered_data['Price'] <= max_price)]

    # Convert the filtered DataFrame to a dictionary list to return in JSON format
    return {"filtered_houses": filtered_data.to_dict(orient="records")}

@app.post("/predict_price")
def predict_price(square_footage: float, bedrooms: int):
    # Use loaded model to make prediction
    prediction = rf_model.predict([[square_footage, bedrooms]])
    return {"predicted_price": prediction[0]}