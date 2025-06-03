import React, { createContext, useState, useEffect, useCallback } from 'react';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [suburbs, setSuburbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  // Fetch all houses and suburbs from static JSON
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const housesRes = await fetch('/houses.json');
      const allHouses = await housesRes.json();
      setHouses(allHouses);

      const uniqueSuburbs = [...new Set(allHouses.map(h => h.Suburb))];
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
    const { suburb, bedrooms, bathrooms } = filters;
    const [minBeds, maxBeds] = bedrooms;
    const [minBaths, maxBaths] = bathrooms;

    const filtered = houses.filter(h => {
      const matchSuburb = !suburb || h.Suburb === suburb;
      const matchBeds = h.Bedroom2 >= minBeds && h.Bedroom2 <= maxBeds;
      const matchBaths = h.Bathroom >= minBaths && h.Bathroom <= maxBaths;
      return matchSuburb && matchBeds && matchBaths;
    });

    setHouses(filtered);
  };

  const getHouseById = (houseId) => {
    const house = houses.find(h => h.House_ID === houseId);
    if (house) {
      setSelectedHouse(house);
    } else {
      setSelectedHouse(null);
    }
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
