import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderTopLeftRadius: 90,
  width: '100%',
  maxWidth: 352,
  margin: '0 auto',
  cursor: 'pointer',
  transition: 'box-shadow 300ms ease-out',
  '&:hover': {
    boxShadow: theme.shadows[10],
  },
}));

const TypeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: 'white',
}));

const CountryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#7c3aed', // Violet-700
  color: 'white',
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: 'text.secondary',
});

const House = ({ house }) => {
  const { image, type, country, address, bedrooms, bathrooms, surface, price } = house;

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={address}
        sx={{ marginBottom: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
          <TypeChip label={type} size="small" />
          <CountryChip label={country} size="small" />
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, maxWidth: 260, marginBottom: 2 }}>
          {address}
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item>
            <IconWrapper>
              <BiBed size={20} />
              <Typography variant="body2">{bedrooms}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item>
            <IconWrapper>
              <BiBath size={20} />
              <Typography variant="body2">{bathrooms}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item>
            <IconWrapper>
              <BiArea size={20} />
              <Typography variant="body2">{surface}</Typography>
            </IconWrapper>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#7c3aed' }}> {/* Violet-700 for price */}
          {price}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default House;