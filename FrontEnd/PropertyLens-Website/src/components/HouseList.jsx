import React, { useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Import context
import { HouseContext } from "./HouseContext";

// Import components
import House from "./House";

const StyledSection = styled("section")(({ theme }) => ({
  marginBottom: theme.spacing(10),
  paddingTop: theme.spacing(20), // Add top padding to create space
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  color: "#7c3aed", // Set color to violet
  display: "block",
  margin: "200px auto 0",
}));

const NoResultsMessage = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.875rem",
  color: "#7c3aed", // Set color to violet
  marginTop: theme.spacing(24),
  paddingTop: theme.spacing(15), // Add padding top for extra space
}));

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  console.log("Loading status:", loading);
  console.log("Number of houses:", Array.isArray(houses) ? houses.length : 0);

  if (loading) {
    return <LoadingSpinner size={40} />;
  }

  if (!Array.isArray(houses) || houses.length < 1) {
    return <NoResultsMessage>Sorry, nothing found</NoResultsMessage>;
  }

  return (
    <StyledSection>
      <Container>
        <Grid container spacing={{ xs: 3, md: 4, lg: 5 }}>
          {houses.map((house) => (
            <Grid item xs={12} md={6} lg={4} key={house.id}>
              <StyledLink to={`/property/${house.id}`}>
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
