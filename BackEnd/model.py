# Import
import pandas as pd
import numpy as np
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
house_data = house_data.drop(columns=['Suburb','SellerG', 'Address', 'Lattitude', 'Longtitude', 'BuildingArea', 'YearBuilt'])
house_data = house_data.dropna()
# Encoding
Type_le = le
Method_le = le
CouncilArea_le = le
Regionname_le = le
house_data['Type'] = Type_le.fit_transform(house_data['Type'])
house_data['Regionname'] = Regionname_le.fit_transform(house_data['Regionname'])
house_data['CouncilArea'] = CouncilArea_le.fit_transform(house_data['CouncilArea'])
house_data['Method'] = Method_le.fit_transform(house_data['Method'])
# Format the "Date" columns into 3 seperate columns for more dimension to the data
house_data['Date'] = pd.to_datetime(house_data['Date'], format='%d/%m/%Y')
house_data['DaySold'] = house_data['Date'].dt.day
house_data['MonthSold'] = house_data['Date'].dt.month
house_data['YearSold'] = house_data['Date'].dt.year
house_data = house_data.drop(columns=['Date']) # Drop Date Collumn

# Outlier

# Car
house_data = house_data[house_data['Car'] < 15]

# Room
# Calculate IQR
Q1 = house_data['Rooms'].quantile(0.25)
Q3 = house_data['Rooms'].quantile(0.75)
IQR = Q3 - Q1
# Identify outliers
outliers = house_data[(house_data['Rooms'] < (Q1 - 1.5 * IQR)) | (house_data['Rooms'] > (Q3 + 1.5 * IQR))]
# Handle outliers by capping them
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
# Landsize
house_data=house_data[house_data["Landsize"]<57000]

# Scaling
house_data[['Landsize']] = sc.fit_transform(house_data[['Landsize']])
house_data[['Propertycount']] = sc.fit_transform(house_data[['Propertycount']])

# Data Merging

# Group schools by postcode and count the number of schools in each postcode
schools_by_postcode = school_data.groupby('Address_Postcode').size().reset_index(name='Schools nearby')

# Merge data with house_data using 'Postcode' and 'Address_Postcode'
house_data_merged = house_data.merge(schools_by_postcode, how='left', left_on='Postcode', right_on='Address_Postcode')

# If a house has no nearby schools, fill the NaN values with 0
house_data_merged['Schools nearby'] = house_data_merged['Schools nearby'].fillna(0).astype(int)

# Drop the redundant 'Address_Postcode' column after the merge
house_data_merged = house_data_merged.drop(columns=['Address_Postcode'])

# Model traning
# Merged
x = house_data_merged.drop(columns=['Price'])
y = house_data_merged['Price'] # Target variable

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
        

        print(f"Model trained. MSE: {mse}, R²: {r2}")
        
    def predict(self, square_footage, bedrooms):
        # Load the model
        model = joblib.load('RainForestRegression_Model.pkl')
        
        # Make a prediction based on input
        return model.predict([[square_footage, bedrooms]])



# Multiclass Clasification

# Create a copy so the original dataset wont changed
house_data_merged_copy = house_data_merged.copy()
# Define price categories
def categorize_price(price):
    if price <= 660000:
        return 'Fixer-Upper'
    elif 660000 < price <= 1345000:
        return 'Affordable'
    else:
        return 'Luxury'
    
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
        print("\nMerged Data Classification Report:")
        print(classification_report(y_test_mcl, y_pred_mcl))
        print("Merged Data Accuracy:", accuracy_score(y_test_mcl, y_pred_mcl))
        
        joblib.dump(self.model, 'MultiClassClassification_Model.pkl') # Save Model
        
# Example usage (for initial training)
if __name__ == "__main__":
    RFRegModel = RainForestRegressionModel()
    RFRegModel.train()
    MclModel = MultiClassClassificationModel()
    MclModel.train()