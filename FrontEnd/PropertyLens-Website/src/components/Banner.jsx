import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

// import image
import Image from "../assets/img/house-banner.png";

const BannerSection = styled("section")(({ theme }) => ({
  width: "90vw",
  position: "relative",
  marginBottom: theme.spacing(4),

  [theme.breakpoints.up("sm")]: {
    height: "60vh",
  },
  [theme.breakpoints.up("md")]: {
    height: "80vh",
  },
  [theme.breakpoints.up("xl")]: {
    height: "60vh",
    marginBottom: theme.spacing(12),
  },
}));

const BackgroundImage = styled("div")({
  position: "absolute",
  borderRadius: "30px",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
});

const ContentContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  zIndex: 2,
}));

const TextContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  color: "#fff",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  [theme.breakpoints.up("lg")]: {
    textAlign: "left",
    paddingLeft: theme.spacing(4),
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: "135px",
  },
}));

const BannerTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 600,
  lineHeight: 1.2,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.625rem",
  },
}));

const RentText = styled("span")({
  color: "#7c3aed",
});

const Banner = () => {
  return (
    <BannerSection>
      <BackgroundImage />
      <ContentContainer maxWidth="xl">
        <TextContent>
          <BannerTitle variant="h1">
            <RentText>Rent</RentText> Your Dream <br />
            House With Us.
          </BannerTitle>
          <Typography variant="body1" sx={{ maxWidth: "480px", mb: 4 }}>
            Find information to make your Decision
          </Typography>
        </TextContent>
      </ContentContainer>
      
    </BannerSection>
  );
};

export default Banner;
