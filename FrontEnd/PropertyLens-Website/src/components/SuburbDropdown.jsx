import React, { useContext, useEffect } from 'react';
import { HouseContext } from './HouseContext';

const SuburbDropdown = () => {
  const { suburbs } = useContext(HouseContext);

  useEffect(() => {
    console.log("Suburbs in dropdown:", suburbs); // Debug log to check data
  }, [suburbs]);

  return (
    <select>
      <option value="">Select a Suburb</option>
      {suburbs.map((suburb, index) => (
        <option key={index} value={suburb}>{suburb}</option>
      ))}
    </select>
  );
};

export default SuburbDropdown;
