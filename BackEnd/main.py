from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import StandardScaler
from typing import Optional, Tuple
from pydantic import BaseModel, Field
import joblib
import pandas as pd

sc = StandardScaler()

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
house_data = pd.read_csv('./Datasets/FrontEnd_House_Data.csv')
# house_data = house_data.dropna()
school_data = pd.read_csv('./Datasets/All Schools List 2018.csv')
school_data = school_data.fillna(value="")
merged_data = pd.read_csv("./Datasets/Merged_Data_with_ID.csv")

# Load models
rf_model = joblib.load("RainForestRegression_Model.pkl")
classification_model = joblib.load("MultiClassClassification_Model.pkl")

# Root
@app.get("/")
async def root():
    return {"message": "Welcome to PropertyLens API"}

# Get - to get all unique suburb name
@app.get("/house/unique_suburbs")
def get_unique_suburbs():
    # Assuming your dataset is loaded as `house_data`
    unique_suburbs = house_data['Suburb'].unique().tolist()
    return {"unique_suburbs": unique_suburbs}

# Post - to get house by suburb name
class HouseNameFilter(BaseModel): # Pydantic for Housefilter
    suburb : Optional[str] = Field(None, description="Name filter by")

@app.post("/house/by/suburb")
def get_house_by_suburb(house: HouseNameFilter):
    filterhouse = house_data
    if house.suburb:
        filterhouse = filterhouse[filterhouse["Suburb"] == house.suburb]
    
    return {"Houses": filterhouse.to_dict(orient="records")}

# Post - House Filter
class HouseFilter(BaseModel): # Pydantic for Housefilter
    suburb: Optional[str] = Field(None, description="Suburb to filter by")
    bedrooms: Optional[Tuple[int,int]] = Field(None, description="Number of bedrooms")
    bathrooms: Optional[Tuple[int,int]] = Field(None, description="Number of bathrooms")
    price_range: Optional[Tuple[float, float]] = Field(None, description="Price range as (min, max)")
    
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
    
    # Filter by price range (min, max)
    if filter.price_range:
        min_price, max_price = filter.price_range
        filtered_data = filtered_data[(filtered_data['Price'] >= min_price) & (filtered_data['Price'] <= max_price)]

    # Convert the filtered DataFrame to a dictionary list to return in JSON format
    return {"filtered_houses": filtered_data.to_dict(orient="records")}


# School Data

# Get - to get all unique school name
@app.get("/school/unique_names")
def get_school_unique_name():
    school_towns = school_data['School_Name'].unique().tolist()
    return {"school_towns": school_towns}


#  Post - to get school by suburb name
class SchoolBySuburbFilter(BaseModel):
    postcode : Optional[int] = Field(None, description="PostCode filter")
    
@app.post("/school/by/postcode")
def post_school_by_suburb(school: SchoolBySuburbFilter):
    filter_school = school_data
    if school.postcode:
        filter_school = filter_school[filter_school["Postal_Postcode"] == school.postcode]
    return {"School" : filter_school.to_dict(orient="records")}

# Prediction Filter
class PredictPriceFilter(BaseModel): # Pydantic for Housefilter
    houseid : Optional[int] = Field(None, description="HouseID")

# Prediction
@app.post("/predict/house_price")
def predict_price(filter: PredictPriceFilter):
    # Check if HouseID is provided
    if filter.houseid is None:
        raise HTTPException(status_code=400, detail="HouseID is required for prediction")
    
    # Step 1: Find the row in merged_data based on HouseID
    house_row = merged_data[merged_data["HouseID"] == filter.houseid]
    
    # Step 2: Check if the house exists in merged_data
    if house_row.empty:
        raise HTTPException(status_code=404, detail="HouseID not found in dataset")
    
    # Step 3: Drop the HouseID and any non-feature columns to prepare data for prediction
    features = house_row.drop(columns=["HouseID", "Price"])  # Assuming "Price" is in the dataset for reference but not needed for prediction
    
    # Step 4: Ensure the feature data is in the correct format (2D array) for the model
    features = features.values  # Convert DataFrame to numpy array
    
    # Step 5: Make the prediction using the regression model
    predicted_price = rf_model.predict(features)
    
    # Step 6: Return the predicted price in the response
    return {"HouseID": filter.houseid, "predicted_price": predicted_price[0]}


# Define the input structure for prediction
class PriceCategoryFilter(BaseModel):
    houseid: Optional[int] = Field(None, description="HouseID to get price category")

@app.post("/house/price_category")
def post_house_price_category(filter: PriceCategoryFilter):
    # Ensure HouseID is provided
    if filter.houseid is None:
        raise HTTPException(status_code=400, detail="HouseID is required")

    # Retrieve the row with the matching HouseID from the preprocessed data
    house_row = merged_data[merged_data['HouseID'] == filter.houseid]
    
    # Check if the house exists in the dataset
    if house_row.empty:
        raise HTTPException(status_code=404, detail="House with the provided HouseID not found")

    # Drop columns not needed for prediction (e.g., HouseID, Price, and Price_Category)
    house_row_for_prediction = house_row.drop(columns=['HouseID', 'Price'])

    # Predict the price category using the preprocessed data
    predicted_category = classification_model.predict(house_row_for_prediction)[0]

    return {"HouseID": filter.houseid, "Predicted_price_category": predicted_category}