import React, { createContext, useEffect, useState } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property Type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price Range (any)");
  const [loading, setLoading] = useState(false);

  //return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]); // Ensure houses is included in the dependency array

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Property (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, [houses]);

  const handleClick = () => {
    //set loading
    setLoading(true);

    //create function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    //get the first value of price and paste it to number
    const minPrice = parseInt(price.split(" ")[0]);
    //get second value of price and paste it to number
    const maxPrice = parseInt(price.split(" ")[2]);
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      //if all value selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      //if all value defaulted
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }
      //if country is not defaulted
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }
      //if property is not defaulted
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }
      //if price is not defaulted
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      //if country and property is not defaulted
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      //if country and price is not defaulted
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      //if property and price is not defaulted
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  const contextValue = {
    houses,
    setHouses,
    country,
    setCountry,
    countries,
    setCountries,
    property,
    setProperty,
    properties,
    setProperties,
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
