import React, { useContext } from 'react';
import { Box, Container, Grid, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// import context
import { HouseContext } from './HouseContext';

// import components
import House from './House';

const StyledSection = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(10),
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const NoResultsMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '1.875rem',
  color: '#7c3aed', // Set color to violet
  marginTop: theme.spacing(24),
}));

// Skeleton loader for loading state
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

  if (loading) {
    return (
      <StyledSection>
        <Container>
          <SkeletonLoader />
        </Container>
      </StyledSection>
    );
  }

  if (houses.length < 1) {
    return <NoResultsMessage>Sorry, nothing found</NoResultsMessage>;
  }

  return (
    <StyledSection>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3, lg: 7 }}>
          {houses.map((house, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <StyledLink to={`/property/${house.id || `house-${index}`}`}>
                <House house={house} />
              </StyledLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default HouseList;
