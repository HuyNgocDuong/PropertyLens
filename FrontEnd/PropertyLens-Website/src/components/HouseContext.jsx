import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [suburb, setSuburb] = useState('Suburb (any)');
  const [suburbs, setSuburbs] = useState([]);
  const [bedroom, setBedroom] = useState('Bedrooms (any)');
  const [bedrooms, setBedrooms] = useState([]);
  const [bathroom, setBathroom] = useState('Bathrooms (any)');
  const [bathrooms, setBathrooms] = useState([]);
  const [price, setPrice] = useState('Price Range (any)');
  const [loading, setLoading] = useState(false);

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

  return (
    <HouseContext.Provider value={contextValue}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
