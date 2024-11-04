import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: 'black', 
        py: { xs: 1, sm: 2 },
        textAlign: 'center', 
        color: 'white',
        width: '100%',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          color="inherit"
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
          }}
        >
          &copy; 2024. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
