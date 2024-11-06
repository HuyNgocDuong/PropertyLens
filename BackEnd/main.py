from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
from typing import Tuple
from pydantic import BaseModel, ValidationError
import joblib
import pandas as pd
le = LabelEncoder()

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
try:
    house_data = pd.read_csv('./Datasets/FrontEnd_Data.csv')
except FileNotFoundError:
    house_data = None  # Set to None to handle cases where the file is missing

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
    # Check if Data loaded
    if house_data is None:
        raise HTTPException(status_code=500, detail="Data file not found.")
    
    # Check if the dataset is empty
    if house_data.empty:
        raise HTTPException(status_code=404, detail="No house data available.")
    
    houses_list = house_data.to_dict(orient="records")
    return houses_list

# GET - GET UNIQUE VALUE OF SUBURB
@app.get("/house/unique_suburbs")
def get_unique_suburbs():
    # Check if Data loaded
    if house_data is None:
        raise HTTPException(status_code=500, detail="Data file not found.")
    
     # Check if 'Suburb' column exists,
    if 'Suburb' not in house_data.columns:
        raise HTTPException(status_code=500, detail="Column 'Suburb' not found in data.")
    
    unique_suburbs = house_data['Suburb'].unique().tolist()
    # Check if any unique value exists
    if not unique_suburbs:
        raise HTTPException(status_code=404, detail="No unique suburbs found.")
    
    return unique_suburbs



# POST - GET HOUSE BY SUBURB
class HouseNameFilter(BaseModel): # Pydantic
    suburb : str

@app.post("/house/by/suburb")
def get_house_by_suburb(house: HouseNameFilter):
     # Check if Data loaded
    if house_data is None:
        raise HTTPException(status_code=500, detail="Data file not found.")
    
     # Check if 'Suburb' column exists,
    if 'Suburb' not in house_data.columns:
        raise HTTPException(status_code=500, detail="Column 'Suburb' not found in data.")
    
    filterhouse = house_data
    if house.suburb:
        filterhouse = filterhouse[filterhouse["Suburb"].str.lower() == house.suburb.lower()]
        
     # Check if any houses were found for the specified suburb
    if filterhouse.empty:
        raise HTTPException(status_code=404, detail=f"No houses found in suburb '{house.suburb}'.")
    
    return {"List of House in Suburb": filterhouse.to_dict(orient="records")}


# POST - GET HOUSE BY HOUSE ID
class HouseIdFilter(BaseModel): # Pydantic
    houseid : int

@app.post("/house/by/houseid")
def get_house_by_houseid(house: HouseIdFilter):
    if house_data is None:
        raise HTTPException(status_code=500, detail="Data file not found.")

    if 'House_ID' not in house_data.columns:
        raise HTTPException(status_code=500, detail="Column 'House_ID' not found in data.")

    print("Requested house ID:", house.houseid)  # Debugging log
    filterhouse = house_data[house_data["House_ID"] == house.houseid]
    
    if filterhouse.empty:
        raise HTTPException(status_code=404, detail=f"No houses found for House Id = '{house.houseid}'.")
    
    return {"Filtered House by ID": filterhouse.to_dict(orient="records")}


# POST - HOUSE FILTER
class HouseFilter(BaseModel):
    suburb: str
    bedrooms: Tuple[int, int]
    bathrooms: Tuple[int, int]
    
@app.post("/house/filter_houses")
def post_filter_houses(filter: HouseFilter):
    
    # Check if data is loaded
    if house_data is None:
        raise HTTPException(status_code=500, detail="Data file not found.")
    
    # Check for columns in the dataset
    required_columns = {'Suburb', 'Bedroom2', 'Bathroom'}
    if not required_columns.issubset(house_data.columns):
        missing = required_columns - set(house_data.columns)
        raise HTTPException(status_code=500, detail=f"Missing columns in data: {missing}")
    
    filtered_data = house_data
    # Filter by suburb
    if filter.suburb:
         filtered_data = filtered_data[filtered_data['Suburb'].str.lower() == filter.suburb.lower()]
    # Filter by bedrooms (min, max), converting to float
    if filter.bedrooms:
        min_bedrooms, max_bedrooms = map(float, filter.bedrooms)
        if min_bedrooms < 0 or max_bedrooms < 0:
            raise HTTPException(status_code=400, detail="Bedroom count must be non-negative.")
        filtered_data = filtered_data[(filtered_data['Bedroom2'] >= min_bedrooms) & (filtered_data['Bedroom2'] <= max_bedrooms)]

    # Filter by bathrooms (min, max), converting to float
    if filter.bathrooms:
        min_bathrooms, max_bathrooms = map(float, filter.bathrooms)
        if min_bathrooms < 0 or max_bathrooms < 0:
            raise HTTPException(status_code=400, detail="Bathroom count must be non-negative.")
        filtered_data = filtered_data[(filtered_data['Bathroom'] >= min_bathrooms) & (filtered_data['Bathroom'] <= max_bathrooms)]
        
    # Check if any houses match the filters
    if filtered_data.empty:
        raise HTTPException(status_code=404, detail="No houses found with the specified filters.")
    # Convert the filtered DataFrame to a dictionary list to return in JSON format
    return {"Filtered Houses List": filtered_data.to_dict(orient="records")}


# POST - GET A LIST OF AVERAGE PRICE AND BEDROOM FOR CATEGORY
class AveragePriceInput(BaseModel):
    Price_Category : str
    Bedroom2 : int
    Price : float
    
@app.post("/category/average_price")   
def post_category_average_price(filter: AveragePriceInput):
    # Step 1: Filter the dataset for the specified Price_Category
    filtered_data = house_data[house_data['Price_Category'] == filter.Price_Category].copy()
    
    # Step 2: Add the user input data to this filtered DataFrame
    user_data = pd.DataFrame([{
        'Price_Category': filter.Price_Category,
        'Bedroom2': filter.Bedroom2,
        'Price': filter.Price
    }])
    filtered_data_with_user = pd.concat([filtered_data, user_data], ignore_index=True)
    
    # Step 3: Calculate the average price by Bedroom2 count (dynamically include all existing Bedroom counts)
    avg_price_filtered = (
        filtered_data_with_user.groupby('Bedroom2')['Price']
        .mean()
        .reset_index()
        .rename(columns={'Bedroom2': 'Bedroom', 'Price': 'Average_Price'})
    )
    
    # Convert DataFrame to a list of dictionaries for output
    result = avg_price_filtered.to_dict(orient="records")
    
    return {"average_price": result}

# PREDICT WITH AI MODEL

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
    try:
        df = data.dict()
        school_nearby = df.pop("SchoolNearBy", None)
        # Create a DataFrame with a single row
        df = pd.DataFrame([df])
       # Ensure categorical columns have been encoded
        if 'PropType' in df and 'RegionName' in df:
            # Check if PropType and RegionName values are known to the encoder
            try:
                df['PropType'] = le.fit_transform([df['PropType']])
                df['RegionName'] = le.fit_transform([df['RegionName']])
            except ValueError as e:
                raise HTTPException(status_code=400, detail=f"Encoding error: {str(e)}")
        # Add School nearby column at the end
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
        
         # Check if all necessary columns are available in df
        missing_columns = set(column_mapping.keys()) - set(df.columns)
        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns in input data: {missing_columns}"
            )
        
        # Renaming the columns
        df.rename(columns=column_mapping, inplace=True)
        processed_data = df
        return processed_data       
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {e}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# POST - PREDICT HOUSE PRICE
@app.post("/predict/house_price")
def predict_price(data: DataInputs):
    try:
        # Process the input data
        processed_data = DataProcessing(data)

        # Make prediction (model expects a DataFrame, hence [0])
        prediction = rf_model.predict(processed_data)[0]

        # Return prediction as JSON response
        return {"predicted_price": round(prediction, 2)}
    
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Data validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Prediction error - data may not be in the expected format: {str(e)}"
        )    
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
        return {"predicted_category": prediction}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Data validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Prediction error - data may not be in the expected format: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))