import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getHousesBySuburb } from '../api'; // Ensure you have the correct import

const PropertyDetails = () => {
    const { suburb } = useParams(); // Get the suburb from the URL
    const [houseDetails, setHouseDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHouseDetails = async () => { // Define the function here
        // Validate the suburb value
        if (!suburb || suburb.trim() === "") {
            setError("Suburb is not defined in the URL.");
            setLoading(false);
            return; // Exit if suburb is undefined or empty
        }

        const suburbData = suburb.trim(); // Normalize suburb input
        console.log("Extracted suburb from URL:", suburb); // Log suburb from URL
        
        setLoading(true); // Start loading

        try {
            // Call the API function to get houses by suburb
            const data = await getHousesBySuburb(suburbData);
            console.log("Fetched data:", data); // Log the fetched data
            setHouseDetails(data["List of House in Suburb"]); // Set house details
        } catch (err) {
            console.error("Error fetching house details:", err); // Log the error
            setError(err.message); // Set error state
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchHouseDetails(); // Call the function inside useEffect
    }, [suburb]); // Dependency on suburb

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box>
            <Typography variant="h4">Properties in {suburb}</Typography>
            {houseDetails.length > 0 ? (
                houseDetails.map((house, index) => (
                    <Box key={index}>
                        <Typography variant="h6">Address: {house.Address}</Typography>
                        <Typography>Rooms: {house.Rooms}</Typography>
                        <Typography>Type: {house.Type}</Typography>
                        <Typography>Bedrooms: {house.Bedroom2}</Typography>
                        <Typography>Bathrooms: {house.Bathroom}</Typography>
                        <Typography>Postcode: {house.Postcode}</Typography>
                        <Typography>Council Area: {house.CouncilArea}</Typography>
                        <Typography>Schools Nearby: {house["Schools nearby"]}</Typography>
                        <Typography>Distance: {house.Distance} km</Typography>
                    </Box>
                ))
            ) : (
                <Typography>No properties found in this suburb.</Typography>
            )}
        </Box>
    );
};

export default PropertyDetails;
