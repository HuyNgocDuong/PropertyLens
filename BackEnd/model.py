# Import
import pandas as pd
import numpy as np
import time  # Import time module for timing
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
from sklearn.metrics import mean_squared_error, r2_score
le = LabelEncoder()
sc = StandardScaler()

# Read datasets
house_data = pd.read_csv('./Datasets/Melbourne housing data.csv')
school_data = pd.read_csv('./Datasets/All Schools List 2018.csv')

# Data Cleaning

house_data = house_data.drop(columns=['Suburb','SellerG', 'Address', 'Lattitude', 'Longtitude', 'BuildingArea', 'YearBuilt', 'Date', 'Method', 'CouncilArea', 'Propertycount', 'Landsize'])
house_data = house_data.dropna()
# Encoding categorical columns
house_data['Type'] = le.fit_transform(house_data['Type'])
house_data['Regionname'] = le.fit_transform(house_data['Regionname'])

# Outlier handling (House Data for Training)
house_data = house_data[house_data['Car'] < 15] # Car
# Calculate IQR
Q1 = house_data['Rooms'].quantile(0.25)
Q3 = house_data['Rooms'].quantile(0.75)
IQR = Q3 - Q1
# Handle outliers by capping them - Room
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
house_data['Rooms'] = np.where(house_data['Rooms'] < lower_bound, lower_bound, house_data['Rooms'])
house_data['Rooms'] = np.where(house_data['Rooms'] > upper_bound, upper_bound, house_data['Rooms'])
# Price
house_data = house_data[house_data['Price'] < 7600000]
# Bathroom
house_data = house_data[house_data['Bathroom'] < 6]
# Bedroom2
house_data = house_data[house_data['Bedroom2'] < 15]

# Data Merging

# Group schools by postcode and count the number of schools in each postcode
schools_by_postcode = school_data.groupby('Address_Postcode').size().reset_index(name='Schools nearby')
# Merge data with house_data using 'Postcode' and 'Address_Postcode'
house_data_merged = house_data.merge(schools_by_postcode, how='left', left_on='Postcode', right_on='Address_Postcode')
# If a house has no nearby schools, fill the NaN values with 0
house_data_merged['Schools nearby'] = house_data_merged['Schools nearby'].fillna(0).astype(int)
# Drop the redundant 'Address_Postcode' column after the merge
house_data_merged = house_data_merged.drop(columns=['Address_Postcode'])

# Model training with merged data 

x = house_data_merged.drop(columns=['Price']) 
y = house_data_merged['Price']
# Splitting 80/20 with a seed so consistent splitting
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=3052024)

# Regression Model
class RainForestRegressionModel:
    def __init__(self):
        # Initialize the model (Linear Regression)
        self.model = RandomForestRegressor()

    def train(self):
        self.model.fit(x_train, y_train) # Train Model
        # Evaluation
        y_predict = self.model.predict(x_test)
        mse = mean_squared_error(y_test, y_predict)
        r2 = r2_score(y_test, y_predict)
        joblib.dump(self.model, 'RainForestRegression_Model.pkl') # Save Model
        print(f"\nRain Forest Regression Model Trained. MSE: {mse}, R²: {r2}")

# Multiclass Clasification

# Define price categories
def categorize_price(price):
    if price <= 660000:
        return 'Fixer-Upper'
    elif 660000 < price <= 1345000:
        return 'Affordable'
    else:
        return 'Luxury'
    
# Create a copy so the original dataset wont changed
house_data_merged_copy = house_data_merged.copy()
# Apply categorization to both datasets
house_data_merged_copy['Price_Category'] = house_data_merged_copy['Price'].apply(categorize_price)
x_mcl = house_data_merged_copy.drop(columns=['Price', 'Price_Category'])
y_mcl = house_data_merged_copy['Price_Category']
x_train_mcl, x_test_mcl, y_train_mcl, y_test_mcl = train_test_split(x_mcl, y_mcl, test_size=0.2, random_state=3052024)

class MultiClassClassificationModel:
    def __init__(self):
        self.model = DecisionTreeClassifier(random_state=3052024)
    def train(self):
        self.model.fit(x_train_mcl, y_train_mcl)
        y_pred_mcl = self.model.predict(x_test_mcl)
        print("\nMulti-Class Classification Model Report:")
        print(classification_report(y_test_mcl, y_pred_mcl))
        print("Model Accuracy:", accuracy_score(y_test_mcl, y_pred_mcl))
        joblib.dump(self.model, 'MultiClassClassification_Model.pkl')
        
if __name__ == "__main__":
    overall_start_time = time.time()  # Start time for entire process
    
    rg_start_time = time.time()  # Start time for regression training
    RFRegModel = RainForestRegressionModel()
    RFRegModel.train()
    rg_end_time = time.time()
    
    mcl_start_time = time.time() # Start time for classification training
    MclModel = MultiClassClassificationModel()
    MclModel.train()
    mcl_end_time = time.time()
    
    overall_end_time = time.time()  # End time for entire process
    print(f"\n======================================================================")
    print(f"\nIt took < {rg_end_time - rg_start_time:.2f} > seconds for Rain Forest Regression Model to train.")
    print(f"\nIt took < {mcl_end_time - mcl_start_time:.2f} > seconds for Multi-Class Classification Model to train.")
    print(f"\nIt took < {overall_end_time - overall_start_time:.2f} > seconds for Both Model Training Process.\n")