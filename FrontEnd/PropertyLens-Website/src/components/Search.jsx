import React, { useContext } from 'react';
import { HouseContext } from './HouseContext';
import { Box, Stack, styled, Container } from '@mui/material';
import { RiSearch2Line } from 'react-icons/ri';

// Import components
import SuburbDropdown from "./SuburbDropdown";
import BedroomDropdown from "./BedroomDropdown";
import BathroomDropdown from "./BathroomDropDown";
import PriceRangeDropdown from "./PriceRangeDropdown";

// Styled search button
import { Button } from '@mui/material';

const SearchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6d28d9, #b389ff)',
  color: '#fff',
  fontWeight: 600,
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 14px rgba(109, 40, 217, 0.4)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(109, 40, 217, 0.6)',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "1.5rem 30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
  position: "relative",
  backgroundColor: "white",
  borderRadius: "0.5rem",
  marginTop: "1rem",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    gap: "0.75rem",
    marginTop: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "20px",
      background: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(10px)",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
    },
  },
}));

const Search = () => {
  const { handleClick } = useContext(HouseContext);

  return (
    <StyledContainer maxWidth="lg">
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} width="100%">
        <Box flexGrow={1}>
          <SuburbDropdown />
        </Box>
        <Box flexGrow={1}>
          <BedroomDropdown />
        </Box>
        <Box flexGrow={1}>
          <BathroomDropdown />
        </Box>
        <Box flexGrow={1}>
          <PriceRangeDropdown />
        </Box>
        <SearchButton
          variant="contained"
          onClick={handleClick}
          startIcon={<RiSearch2Line />}
          fullWidth
        >
          Search
        </SearchButton>
      </Stack>
    </StyledContainer>
  );
};

export default Search;
