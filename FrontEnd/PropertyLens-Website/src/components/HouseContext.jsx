<<<<<<< HEAD
import React, { createContext, useEffect, useState } from 'react';
=======
import React, { createContext, useState, useCallback, useEffect } from 'react';
>>>>>>> 915229c3c5092bcef1b1b8faedf3ef29a59f5d50
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
<<<<<<< HEAD
  const [suburb, setSuburb] = useState('Suburb (any)');
  const [suburbs, setSuburbs] = useState([]);
  const [bedroom, setBedroom] = useState('Bedrooms (any)');
  const [bedrooms, setBedrooms] = useState([]);
  const [bathroom, setBathroom] = useState('Bathrooms (any)');
  const [bathrooms, setBathrooms] = useState([]);
  const [price, setPrice] = useState('Price Range (any)');
=======
>>>>>>> 915229c3c5092bcef1b1b8faedf3ef29a59f5d50
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [suburbs, setSuburbs] = useState([]); // State to store unique suburbs

<<<<<<< HEAD
  // Fetch unique values for suburb, bedrooms, and bathrooms from backend
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [suburbRes, bedroomRes, bathroomRes] = await Promise.all([
          axios.get('/api/unique-suburbs'),
          axios.get('/api/unique-bedrooms'),
          axios.get('/api/unique-bathrooms'),
        ]);

        setSuburbs(['Suburb (any)', ...suburbRes.data.suburbs]);
        setBedrooms(['Bedrooms (any)', ...bedroomRes.data.bedrooms]);
        setBathrooms(['Bathrooms (any)', ...bathroomRes.data.bathrooms]);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleClick = async () => {
    setLoading(true);

    // Determine if a filter is set to "any" (default)
    const isDefault = (str) => str.includes('(any)');
    const [minPrice, maxPrice] = price.split(' ').filter((val) => !isNaN(val)).map(Number);

    try {
      // Prepare filters for the request
      const filters = {
        suburb: isDefault(suburb) ? '' : suburb,
        bedrooms: isDefault(bedroom) ? [0, Infinity] : bedroom.split('-').map(Number),
        bathrooms: isDefault(bathroom) ? [0, Infinity] : bathroom.split('-').map(Number),
        priceRange: isDefault(price) ? [0, Infinity] : [minPrice, maxPrice],
      };

      // Send the filter request to the backend
      const response = await axios.post('/api/house/filter_houses', filters);
      setHouses(response.data['Filtered Houses List']);
    } catch (error) {
      console.error("Error filtering houses:", error);
      setHouses([]); // Clear the houses list if an error occurs
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    houses,
    setHouses,
    suburb,
    setSuburb,
    suburbs,
    bedroom,
    setBedroom,
    bedrooms,
    bathroom,
    setBathroom,
    bathrooms,
    price,
    setPrice,
    loading,
    setLoading,
    handleClick,
  };
=======
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
>>>>>>> 915229c3c5092bcef1b1b8faedf3ef29a59f5d50

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
