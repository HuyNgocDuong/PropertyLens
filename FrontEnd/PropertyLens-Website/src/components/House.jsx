import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BiBed, BiBath } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

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

const SuburbChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#7c3aed', // Violet color
  color: 'white',
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const House = ({ house }) => {
  // Destructure fields based on your data structure
  const { image, Type, Suburb, Bedroom2, Bathroom, Postcode, price } = house;

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={Suburb}
        sx={{ marginBottom: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        {/* First Line: Suburb and Type */}
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
          <SuburbChip label={Suburb} size="small" />
          <TypeChip label={Type} size="small" />
        </Box>

        {/* Second Line: Bedrooms, Bathrooms, and Postcode */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item>
            <IconWrapper>
              <BiBed size={20} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{Bedroom2}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item>
            <IconWrapper>
              <BiBath size={20} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{Bathroom}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item>
            <IconWrapper>
              <MdLocationOn size={20} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{Postcode}</Typography>
            </IconWrapper>
          </Grid>
        </Grid>

        {/* Last Line: Price */}
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#7c3aed' }}>
          ${price.toLocaleString()}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default House;
