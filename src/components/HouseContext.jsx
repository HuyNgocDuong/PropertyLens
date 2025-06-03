import React, { createContext, useState, useEffect, useCallback } from 'react';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [allHouses, setAllHouses] = useState([]);
  const [suburbs, setSuburbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  // Load houses and suburbs
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/houses.json');
      const data = await res.json();
      const houseList = data.houses || [];

      setAllHouses(houseList);
      setHouses(houseList);

      const uniqueSuburbs = [...new Set(houseList.map(h => h.Suburb))];
      setSuburbs(uniqueSuburbs.sort());
    } catch (error) {
      console.error("Error loading data:", error);
      setHouses([]);
      setSuburbs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter frontend data
  const handleClick = (filters) => {
    const {
      suburb = '',
      bedrooms = [0, Infinity],
      bathrooms = [0, Infinity]
    } = filters;

    const [minBeds, maxBeds] = bedrooms;
    const [minBaths, maxBaths] = bathrooms;

    const filtered = allHouses.filter(h => {
      const matchSuburb = !suburb || h.Suburb === suburb;
      const matchBeds = h.Bedroom2 >= minBeds && h.Bedroom2 <= maxBeds;
      const matchBaths = h.Bathroom >= minBaths && h.Bathroom <= maxBaths;
      return matchSuburb && matchBeds && matchBaths;
    });

    setHouses(filtered);
  };

  // Select house by ID
  const getHouseById = (houseId) => {
    const house = allHouses.find(h => h.id === parseInt(houseId));
    setSelectedHouse(house || null);
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
