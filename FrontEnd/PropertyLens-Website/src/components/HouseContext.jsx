import React, { createContext, useEffect, useState } from "react";
import { housesData } from "../data";
import HouseList from "../components/HouseList";


export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [suburb, setSuburb] = useState("Suburb (any)");
  const [suburbs, setSuburbs] = useState([]);
  const [bedroom, setBedroom] = useState("Bedrooms (any)");
  const [bedroomOptions, setBedroomOptions] = useState([]);
  const [bathrooms, setBathrooms] = useState("Bathrooms (any)");
  const [bathroomOptions, setBathroomOptions] = useState([]);
  const [price, setPrice] = useState("Price Range (any)");
  const [loading, setLoading] = useState(false);

  // Extract unique values for suburbs, bedrooms, and bathrooms once on load
  useEffect(() => {
    const allSuburbs = housesData.map((house) => house.Suburb);
    setSuburbs(["Suburb (any)", ...new Set(allSuburbs)]);

    const allBedrooms = housesData.map((house) => house.Bedroom2);
    const uniqueBedrooms = Array.from(new Set(allBedrooms)).sort((a, b) => a - b);
    setBedroomOptions(["Bedrooms (any)", ...uniqueBedrooms]);

    const allBathrooms = housesData.map((house) => house.Bathroom);
    const uniqueBathrooms = Array.from(new Set(allBathrooms)).sort((a, b) => a - b);
    setBathroomOptions(["Bathrooms (any)", ...uniqueBathrooms]);
  }, []); // Empty dependency array to prevent re-runs

  const handleClick = () => {
    console.log("Starting filter...");
    setLoading(true);

    // Helper function to check if a selection is defaulted to "(any)"
    const isDefault = (str) => str.includes("(any)");

    // Parse price range or set to [0, Infinity] if defaulted
    const [minPrice, maxPrice] = !isDefault(price)
      ? price.split(" - ").map((p) => parseInt(p))
      : [0, Infinity];
    console.log(`Parsed price range: ${minPrice} - ${maxPrice}`);

    // Filter the houses based on the selected criteria
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      const matchesSuburb = isDefault(suburb) || house.Suburb === suburb;
      const matchesBedroom = isDefault(bedroom) || house.Bedroom2 === parseInt(bedroom);
      const matchesBathroom = isDefault(bathrooms) || house.Bathroom === parseInt(bathrooms);
      const matchesPrice = housePrice >= minPrice && housePrice <= maxPrice;

      return matchesSuburb && matchesBedroom && matchesBathroom && matchesPrice;
    });

    console.log("Filtered houses:", newHouses);

    // Simulate loading delay and update state
    setTimeout(() => {
      setHouses(newHouses.length > 0 ? newHouses : []);
      setLoading(false);
      console.log("Loading finished.");
    }, 1000);
  };

  const contextValue = {
    houses,
    setHouses,
    suburb,
    setSuburb,
    suburbs,
    bedroom,
    setBedroom,
    bedroomOptions,
    bathrooms,
    setBathrooms,
    bathroomOptions,
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
