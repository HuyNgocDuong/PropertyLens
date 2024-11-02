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

// import context
import { HouseContext } from "./HouseContext";

// import components
import House from "./House";

const StyledSection = styled("section")(({ theme }) => ({
  marginBottom: theme.spacing(10),
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
}));

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  console.log("Loading status:", loading);
  console.log("Number of houses:", houses.length);

  if (loading) {
    return <LoadingSpinner size={40} />;
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
