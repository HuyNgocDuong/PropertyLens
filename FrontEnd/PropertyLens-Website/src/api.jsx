import axios from "axios";

// Create an axios instance with the base URL of the FastAPI server
const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Adjust the port if needed
});

// Get all unique suburbs
export const getUniqueSuburbs = async () => {
  try {
    const response = await apiClient.get("/house/unique_suburbs");
    return response.data;
  } catch (error) {
    console.error("Error fetching unique suburbs:", error);
    throw error;
  }
};

// Get all house data
export const getAllHouses = async () => {
  try {
    const response = await apiClient.get("/house/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all houses:", error);
    throw error;
  }
};

// Get houses by suburb
export const getHousesBySuburb = async (suburb) => {
  try {
    const response = await apiClient.post("/house/by/suburb", { suburb });
    return response.data;
  } catch (error) {
    console.error("Error fetching houses by suburb:", error);
    throw error;
  }
};

// Example filter function for houses
export const filterHouses = async (filterParams) => {
  try {
    const response = await apiClient.post("/house/filter_houses", filterParams);
    return response.data;
  } catch (error) {
    console.error("Error filtering houses:", error);
    throw error;
  }
};
