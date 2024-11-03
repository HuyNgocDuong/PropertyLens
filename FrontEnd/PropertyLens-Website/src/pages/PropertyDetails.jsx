import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const PropertyDetails = () => {
    const { suburb } = useParams(); // Get the suburb from the URL
    const [houseDetails, setHouseDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            const suburbData = { suburb: suburb.trim() }; // Ensure suburb is trimmed
            console.log("Sending request for suburb:", suburbData); // Debug log
            
            try {
                const response = await fetch(`http://localhost:8000/house/by/suburb`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(suburbData), // Send suburb in JSON format
                });

                console.log("Response status:", response.status); // Check response status

                if (!response.ok) {
                    throw new Error('House not found');
                }

                const data = await response.json();
                console.log("Fetched data:", data); // Log the fetched data
                setHouseDetails(data["List of House in Suburb"]);
            } catch (err) {
                console.error("Error fetching house details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseDetails();
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
