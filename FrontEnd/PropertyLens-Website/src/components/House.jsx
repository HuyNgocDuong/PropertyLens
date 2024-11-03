import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BiBed, BiBath } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

// Import house images
import House1 from "../assets/img/houses/house1.png";
import House2 from "../assets/img/houses/house2.png";
import House3 from "../assets/img/houses/house3.png";
import House4 from "../assets/img/houses/house4.png";
import House5 from "../assets/img/houses/house5.png";
import House6 from "../assets/img/houses/house6.png";
import House7 from "../assets/img/houses/house7.png";
import House8 from "../assets/img/houses/house8.png";
import House9 from "../assets/img/houses/house9.png";
import House10 from "../assets/img/houses/house10.png";
import House11 from "../assets/img/houses/house11.png";
import House12 from "../assets/img/houses/house12.png";

// Create an array of images
const houseImages = [
  House1, House2, House3, House4, House5,
  House6, House7, House8, House9, House10,
  House11, House12
];

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
  const { Type, Suburb, Bedroom2, Bathroom, Postcode, price } = house;

  // Assign a random image from the houseImages array
  const randomImage = houseImages[Math.floor(Math.random() * houseImages.length)];

  // Check for undefined or null price
  const formattedPrice = price != null ? `$${price.toLocaleString()}` : 'Price unavailable';

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={randomImage} // Use the randomly selected image
        alt={Suburb}
        sx={{ marginBottom: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        {/* First Line: Suburb and Type */}
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
          <SuburbChip label={Suburb} size="small" />
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

      </CardContent>
    </StyledCard>
  );
};

export default House;
