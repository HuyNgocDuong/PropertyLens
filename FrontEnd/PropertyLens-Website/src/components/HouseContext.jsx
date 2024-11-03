import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [suburb, setSuburb] = useState("Suburb (any)");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [minBathrooms, setMinBathrooms] = useState("");
  const [maxBathrooms, setMaxBathrooms] = useState("");
  const [loading, setLoading] = useState(false);

  const [suburbs, setSuburbs] = useState([]);

  // Initialize suburbs filter options from API or dataset
  useEffect(() => {
    async function fetchSuburbs() {
      try {
        const response = await axios.get("http://localhost:8000/house/unique_suburbs");
        setSuburbs(["Suburb (any)", ...response.data]);
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    }

    fetchSuburbs();
  }, []);

  // Filter function to search houses based on user criteria
  const handleClick = async () => {
    setLoading(true);

    const payload = {
      suburb: suburb === "Suburb (any)" ? "" : suburb,
      bedrooms: [
        minBedrooms ? parseInt(minBedrooms) : 0,
        maxBedrooms ? parseInt(maxBedrooms) : 10,
      ],
      bathrooms: [
        minBathrooms ? parseInt(minBathrooms) : 0,
        maxBathrooms ? parseInt(maxBathrooms) : 10,
      ],
    };

    try {
      const response = await axios.post("http://localhost:8000/house/filter_houses", payload);
      setHouses(response.data["Filtered Houses List"]);
    } catch (error) {
      console.error("Error fetching filtered houses:", error);
      setHouses([]);
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
    minBedrooms,
    setMinBedrooms,
    maxBedrooms,
    setMaxBedrooms,
    minBathrooms,
    setMinBathrooms,
    maxBathrooms,
    setMaxBathrooms,
    loading,
    setLoading,
    handleClick,
  };

  return <HouseContext.Provider value={contextValue}>{children}</HouseContext.Provider>;
};

export default HouseContextProvider;
