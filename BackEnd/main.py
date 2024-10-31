from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import StandardScaler, LabelEncoder
from typing import Tuple
from pydantic import BaseModel
import joblib
import pandas as pd
le = LabelEncoder()
# sc = StandardScaler()

app = FastAPI()

# Add CORS middleware - Allow request from react app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Data
house_data = pd.read_csv('./Datasets/FrontEnd_Data.csv')
school_data = pd.read_csv('./Datasets/All Schools List 2018.csv')
school_data = school_data.fillna(value="")

# Load models
rf_model = joblib.load("RainForestRegression_Model.pkl")
classification_model = joblib.load("MultiClassClassification_Model.pkl")

# Root
@app.get("/")
async def root():
    return {"Message": "Welcome to PropertyLens API"}

# HOUSE DATA

# GET - LIST OF ALL HOUSES
@app.get("/house/all")
def get_all_house():
    houses_list = house_data.to_dict(orient="records")
    return houses_list

# GET - GET UNIQUE VALUE OF SUBURB
@app.get("/house/unique_suburbs")
def get_unique_suburbs():
    try:
        unique_suburbs = house_data['Suburb'].unique().tolist()
        return unique_suburbs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# POST - GET HOUSE BY SUBURB
class HouseNameFilter(BaseModel):
    suburb : str

@app.post("/house/by/suburb")
def get_house_by_suburb(house: HouseNameFilter):
    filterhouse = house_data
    if house.suburb:
        filterhouse = filterhouse[filterhouse["Suburb"] == house.suburb]
    
    return {"List of House in Suburb": filterhouse.to_dict(orient="records")}

# POST - HOUSE FILTER
class HouseFilter(BaseModel):
    suburb: str
    bedrooms: Tuple[float,float]
    bathrooms: Tuple[float,float]
    
@app.post("/house/filter_houses")
def post_filter_houses(filter: HouseFilter):
    filtered_data = house_data
    # Filter by suburb
    if filter.suburb:
        filtered_data = filtered_data[filtered_data['Suburb'] == filter.suburb]
    # Filter by bedrooms (min, max)
    if filter.bedrooms:
        min_bedrooms, max_bedrooms = filter.bedrooms
        filtered_data = filtered_data[(filtered_data['Bedroom2'] >= min_bedrooms) & (filtered_data['Bedroom2'] <= max_bedrooms)]
    # Filter by bathrooms (min, max)
    if filter.bathrooms:
        min_bathrooms, max_bathrooms = filter.bathrooms
        filtered_data = filtered_data[(filtered_data['Bathroom'] >= min_bathrooms) & (filtered_data['Bathroom'] <= max_bathrooms)]
    # Convert the filtered DataFrame to a dictionary list to return in JSON format
    return {"Filtered Houses List": filtered_data.to_dict(orient="records")}

# PREDICT WITH AI MODEL - USING HOUSE ID, WHICH EXIST IN BOTH DATA

# Handle Front End Input
class DataInputs(BaseModel):
    Rooms : int
    PropType : str
    Distance : float
    Postcode : float
    Bedroom2 : float
    Bathroom : float
    Car : float
    RegionName : str
    SchoolNearBy : int
# Function to Process Data from Front End    
def DataProcessing(data: DataInputs):
    df = data.dict()
    school_nearby = df.pop("SchoolNearBy", None)
    # Create a DataFrame with a single row
    df = pd.DataFrame([df])
    # Encode categorical columns
    df['PropType'] = le.fit_transform([df['PropType']])
    df['RegionName'] = le.fit_transform([df['RegionName']])
    df['SchoolNearby'] = school_nearby
    # Dictionary to map old column names to new ones
    column_mapping = {
        "Rooms": "Rooms", 
        "PropType": "Type", 
        "Distance": "Distance", 
        "Postcode": "Postcode", 
        "Bedroom2": "Bedroom2", 
        "Bathroom": "Bathroom", 
        "Car": "Car", 
        "RegionName": "Regionname", 
        "SchoolNearby": "Schools nearby"
    }
    # Renaming the columns
    df.rename(columns=column_mapping, inplace=True)
    processed_data = df
    return processed_data


# POST - PREDICT HOUSE PRICE
@app.post("/predict/house_price")
def predict_price(data: DataInputs):
    try:
        # Process the input data
        processed_data = DataProcessing(data)

        # Make prediction (model expects a DataFrame, hence [0])
        prediction = rf_model.predict(processed_data)[0]

        # Return prediction as JSON response
        return {"predicted_price": prediction}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# POST - PREDICT HOUSE PRICE CATEGORY    
@app.post("/predict/price_category")
def predict_price_category(data: DataInputs):
    try:
        # Process the input data
        processed_data = DataProcessing(data)

        # Make prediction (model expects a DataFrame, hence [0])
        prediction = classification_model.predict(processed_data)[0]

        # Return prediction as JSON response
        return {"predicted_price": prediction}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))