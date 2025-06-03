import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [suburbs, setSuburbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  // Fetch all houses on initial load
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

  // Fetch unique suburbs
  const fetchUniqueSuburbs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/house/unique_suburbs');
      setSuburbs(response.data);
    } catch (error) {
      console.error("Error fetching unique suburbs:", error);
      setSuburbs([]);
    }
  }, []);

  // Filter houses by criteria
  const handleClick = async (filters) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/house/filter_houses', filters);
      setHouses(response.data['Filtered Houses List']);
    } catch (error) {
      console.error("Error filtering houses:", error);
      setHouses([]);
    } finally {
      setLoading(false);
    }
  };

  // Get house by ID
  const getHouseById = useCallback(async (houseId) => {
    if (selectedHouse && selectedHouse.House_ID === houseId) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/house/by/houseid', { houseid: houseId });
      setSelectedHouse(response.data['Filtered House by ID'][0]);
    } catch (error) {
      console.error("Error fetching house by ID:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedHouse]);

  // On mount
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
