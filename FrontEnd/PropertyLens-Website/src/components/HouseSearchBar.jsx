import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";

const HouseSearchBar = () => {
  const {
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
    handleClick,
    loading,
  } = useContext(HouseContext);

  return (
    <div>
      <select value={suburb} onChange={(e) => setSuburb(e.target.value)}>
        {suburbs.map((suburbOption, index) => (
          <option key={index} value={suburbOption}>
            {suburbOption}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Bedrooms"
        value={minBedrooms}
        onChange={(e) => setMinBedrooms(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Bedrooms"
        value={maxBedrooms}
        onChange={(e) => setMaxBedrooms(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Bathrooms"
        value={minBathrooms}
        onChange={(e) => setMinBathrooms(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Bathrooms"
        value={maxBathrooms}
        onChange={(e) => setMaxBathrooms(e.target.value)}
      />

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default HouseSearchBar;
