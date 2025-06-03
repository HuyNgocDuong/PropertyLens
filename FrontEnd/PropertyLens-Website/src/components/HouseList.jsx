import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HouseContext } from './HouseContext';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Skeleton,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

// Import images
import house1 from '../assets/img/apartments/a1.png';
import house2 from '../assets/img/apartments/a2.png';
import house3 from '../assets/img/apartments/a3.png';
import house4 from '../assets/img/apartments/a4.png';
import house5 from '../assets/img/apartments/a5.png';
import house6 from '../assets/img/apartments/a6.png';
import house7 from '../assets/img/houses/house1.png';
import house8 from '../assets/img/houses/house2.png';
import house9 from '../assets/img/houses/house3.png';
import house10 from '../assets/img/houses/house4.png';
import house11 from '../assets/img/houses/house5.png';
import house12 from '../assets/img/houses/house6.png';
import house13 from '../assets/img/houses/house7.png';
import house14 from '../assets/img/houses/house8.png';
import house15 from '../assets/img/houses/house9.png';
import house16 from '../assets/img/houses/house10.png';
import house17 from '../assets/img/houses/house11.png';
import house18 from '../assets/img/houses/house12.png';
import house19 from '../assets/img/houses/house3.png';
import house20 from '../assets/img/houses/house7.png';
import house21 from '../assets/img/apartments/a5.png';
import house22 from '../assets/img/apartments/a4.png';
import house23 from '../assets/img/apartments/a6.png';
import house24 from '../assets/img/apartments/a4.png';
import house25 from '../assets/img/houses/house11.png';

const StyledSection = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(10),
}));

const SkeletonLoader = () => (
  <Grid container spacing={3}>
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={250} />
        <Skeleton variant="text" width="60%" sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="40%" />
      </Grid>
    ))}
  </Grid>
);

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  const houseImages = {
    1: house1, 2: house2, 3: house3, 4: house4, 5: house5,
    6: house6, 7: house7, 8: house8, 9: house9, 10: house10,
    11: house11, 12: house12, 13: house13, 14: house14, 15: house15,
    16: house16, 17: house17, 18: house18, 19: house19, 20: house20,
    21: house21, 22: house22, 23: house23, 24: house24, 25: house25,
  };

  if (loading) {
    return (
      <StyledSection>
        <Container>
          <SkeletonLoader />
        </Container>
      </StyledSection>
    );
  }

  return (
    <Box sx={{ marginTop: '130px', px: { xs: 2, sm: 4, md: 6 } }}>
      {houses.length === 0 ? (
        <Typography variant="h5" sx={{ color: '#7e57c2', fontWeight: 'bold', marginTop: 4 }}>
          Sorry, we found nothing!
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {houses.map((house, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={house.House_ID || index}>
              <Link to={`/property/${house.House_ID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={houseImages[house.House_ID] || house1}
                    alt={`${house.Suburb} house`}
                    sx={{ borderRadius: 3 }}
                  />
                  <CardContent>
                    <Chip
                      label={house.Suburb}
                      sx={{
                        backgroundColor: '#7e57c2',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        marginBottom: '8px'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Address: {house.Address}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <BedIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">{house.Bedroom2} Beds</Typography>
                      </Grid>
                      <Grid item>
                        <BathtubIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">{house.Bathroom} Baths</Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Postcode: {house.Postcode}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HouseList;
