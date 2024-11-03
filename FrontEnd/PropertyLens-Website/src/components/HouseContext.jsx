import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [suburbs, setSuburbs] = useState([]); // State to store unique suburbs

  // Function to fetch all houses on initial load
  const fetchAllHouses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/house/all');
      setHouses(response.data);
    } catch (error) {
      console.error("Error fetching all houses:", error);
      setHouses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch unique suburbs from the backend
  const fetchUniqueSuburbs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/house/unique_suburbs');
      console.log("Fetched suburbs:", response.data); // Add this line to debug
      setSuburbs(response.data);
    } catch (error) {
      console.error("Error fetching unique suburbs:", error);
      setSuburbs([]);
    }
  }, []);
  
  const handleClick = async (filters) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/house/filter_houses', filters);
      setHouses(response.data['Filtered Houses List']);
    } catch (error) {
      console.error("Error fetching filtered houses:", error);
      setHouses([]);
    } finally {
      setLoading(false);
    }
  };

  const getHouseById = useCallback(async (houseId) => {
    if (selectedHouse && selectedHouse.House_ID === houseId) return;

    setLoading(true);
    try {
      console.log("Requested house ID:", houseId);
      const response = await axios.post('http://localhost:8000/house/by/houseid', { houseid: houseId });
      setSelectedHouse(response.data['Filtered House by ID'][0]);
    } catch (error) {
      console.error("Error fetching house by ID:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedHouse]);

  // Automatically fetch all houses and unique suburbs on component mount
  useEffect(() => {
    fetchAllHouses();
    fetchUniqueSuburbs();
  }, [fetchAllHouses, fetchUniqueSuburbs]);

  return (
    <HouseContext.Provider value={{ 
      houses, 
      handleClick, 
      getHouseById, 
      selectedHouse, 
      suburbs, 
      loading 
    }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
