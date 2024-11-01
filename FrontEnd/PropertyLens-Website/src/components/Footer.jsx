import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'black', py: 2, textAlign: 'center', color: 'white' }}>
      <Container>
        <Typography variant="body2" color="inherit">
          &copy; 2024. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
