import React, { useContext } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// Import components
import SuburbDropdown from "./SuburbDropdown";
import BedroomDropdown from "./BedroomDropdown";
import BathroomDropdown from "./BathroomDropDown";
import PriceRangeDropdown from "./PriceRangeDropdown";

// Import context
import { HouseContext } from "./HouseContext";

// Import icons
import { RiSearch2Line } from "react-icons/ri";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "1.5rem 30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
  position: "relative",
  backgroundColor: "white",
  borderRadius: "0.5rem",
  marginTop: "1rem", // Add space above the search bar
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    gap: "0.75rem",
    marginTop: "0.5rem", // Increase space for larger screens
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

const SearchButton = styled(Button)({
  backgroundColor: "#7c3aed", // Violet-700
  color: "white",
  height: "4rem",
  borderRadius: "0.5rem",
  fontSize: "1.125rem",
  "&:hover": {
    backgroundColor: "#6d28d9", // Violet-800
  },
  "@media (min-width: 1024px)": {
    maxWidth: "162px",
  },
});

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
