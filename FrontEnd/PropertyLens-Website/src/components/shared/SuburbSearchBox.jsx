import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function SuburbSearchBox() {
  const [selectedSuburb, setSelectedSuburb] = useState("");

  const [suburbs, setSuburbs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch unique suburbs from the API
    axios
      .get("http://127.0.0.1:8000/unique_suburbs")
      .then((response) => {
        setSuburbs(response.data.unique_suburbs); // Set fetched data to state
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error fetching suburbs:", error);
        setLoading(false);
      });
  }, []);

  const handleSuburbChange = (event) => {
    setSelectedSuburb(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select Suburb</InputLabel>
      {loading ? (
        <CircularProgress /> // Show loading spinner while fetching data
      ) : (
        <Select
          value={selectedSuburb}
          onChange={handleSuburbChange}
          label="Select Suburb"
        >
          {suburbs.map((suburb, index) => (
            <MenuItem key={index} value={suburb}>
              {suburb}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}

export default SuburbSearchBox;
