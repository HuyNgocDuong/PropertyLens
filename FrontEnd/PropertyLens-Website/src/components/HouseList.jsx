import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HouseContext } from './HouseContext';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ marginTop: '130px' }}> {/* Use MUI Box for layout */}
      {houses.map(house => (
        <Link to={`/property/${house.House_ID}`} key={house.House_ID} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
            {/* Display house image */}
            <CardMedia
              component="img"
              height="200" // Adjust the height as needed
              image={house.Image} // Use house.Image or house.ImageLg for larger images
              alt={`${house.Suburb} house`}
              sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} // Rounded corners on top if desired
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {house.Suburb}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {house.Address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bedrooms: {house.Bedroom2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bathrooms: {house.Bathroom}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Postcode: {house.Postcode}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default HouseList;
