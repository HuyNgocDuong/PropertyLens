import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  IconButton,
  styled
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import aiDataVisualization from "../assets/img/about/662f58e1e6dd5be58d583ec3_AI-data-visualization.jpg";
import baoImage from "../assets/img/about/bao.jpeg";
import folkImage from "../assets/img/about/folk.jpg";
import huyImage from "../assets/img/about/huy.jpg";
import backgroundImage from "../assets/img/about/livingroombanner_001.jpg";

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "385px",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundAttachment: "fixed",
    overflow: "hidden",
  },
  gradientBanner: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContent: {
    textAlign: "center",
    marginTop: "20px",
  },
  sectionHeading: {
    color: "rgb(50, 50, 50)",
    fontSize: "32px", // Reduced font size
    fontWeight: 500,
    letterSpacing: "1px",
  },
  borderLine: {
    border: "2px solid #8A2BE2",
    width: "150px",
    borderRadius: "20px",
    margin: "27px auto",
  },
  borderLine1: {
    border: "2px solid #8A2BE2",
    width: "150px",
    borderRadius: "20px",
    marginTop: "8px", // Adjust space above the line
    marginLeft: "0",  // Aligns the line with the left side of the container
  },
  
  aboutText: {
    fontFamily: "Poppins",
    color: "rgb(107, 107, 107)",
    fontSize: "16px",
    lineHeight: 1.5,
  },
  founderShape: {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    "& img": {
      objectFit: "cover",
      width: "100%",
      height: "auto",
    },
  },
  socialIcon: {
    color: "#ababab",
    transition: "transform 0.5s",
    "&:hover": {
      color: "#8A2BE2",
      transform: "translateY(-5px)",
    },
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#fff',
    backgroundColor: '#444',
    borderRadius: '6px',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#fff',
  },
  marginBottom: '10px',
});

const About = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbz_ZKysjiqRnG_VpHd6-WRw-9rRS_zmS18w45iLvTUhcOZIwcRDpe5EwdSyfIwh7SJrNg/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formData)
      });
      setMsg("Message sent successfully!");
      setFormData({ Name: "", Email: "", Message: "" });
    } catch (error) {
      setMsg("Failed to send message. Try again later.");
    }
  };

  return (
    <Box>
      <Box className={classes.banner}>
        <Box className={classes.gradientBanner}>
          <Box className={classes.bannerContent}>
            <Typography variant="h1" color="white" fontWeight={500} fontSize={60}>About Us</Typography>
            <Typography variant="h2" color="white" fontWeight={400} fontSize={16} mt={2}>Excellent quality houses choices</Typography>
          </Box>
        </Box>
      </Box>

      <Container sx={{ mt: 8 }}>
        <Box textAlign="center" width="65%" mx="auto">
          <Typography variant="h1" className={classes.sectionHeading}>Who We Are</Typography>
          <Box className={classes.borderLine} />
          <Typography className={classes.aboutText}>
            Welcome to PropertyLens, a reliable platform leading the way in real estate advancements. Our group of skilled professionals and experts who rely on data is committed to assisting you in confidently navigating the real estate market. Using sophisticated AI technology and a comprehensive knowledge of market trends, we offer thorough property analysis, precise pricing forecasts, and customized assistance for a seamless real estate experience.
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center" mt={8}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h1" className={classes.sectionHeading}>What We Do</Typography>
              <Box className={classes.borderLine1} /> {/* Aligns the border line with the left side of the heading */}
            </Box>
            <Typography className={classes.aboutText} mt={2}>
              At PropertyLens, we utilize advanced AI technology to streamline the intricacies of the real estate industry. Our platform provides insights based on data, such as assessing property values, analyzing trends, and giving personalized recommendations that fit your specific requirements. Our aim is to offer precise market forecasts and practical advice to help you confidently navigate real estate transactions.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img" src={aiDataVisualization} alt="AI Data Visualization" sx={{ width: '100%', borderRadius: '20px' }} />
          </Grid>
        </Grid>


        <Box textAlign="center" mt={8}>
          <Typography variant="h1" className={classes.sectionHeading}>Our Founders</Typography>
          <Typography variant="h2" fontSize={20} fontStyle="italic" color="rgb(120, 120, 120)" mt={1}>Meet Our Team</Typography>
          <Grid container spacing={4} justifyContent="center" mt={2}>
            {[
              { name: "Nhu Gia Bao Nguyen", position: "Chief Executive Officer", image: baoImage },
              { name: "Pattarapol Tantechasa", position: "Chief Technology Officer", image: folkImage },
              { name: "Ngoc Huy Duong", position: "Chief Operating Officer", image: huyImage },
            ].map((founder, index) => (
              <Grid item key={index}>
                <Box className={classes.founderShape}>
                  <img src={founder.image} alt={founder.name} />
                </Box>
                <Typography variant="h6" mt={2}>{founder.name}</Typography>
                <Typography variant="subtitle1" color="rgb(120, 120, 120)" fontStyle="italic">{founder.position}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={4} mt={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" className={classes.sectionHeading}>Contact Us</Typography>
            <Box className={classes.borderLine1} />
            <Box display="flex" alignItems="center" mt={2}>
              <EmailIcon sx={{ mr: 2, color: '#8A2BE2' }} />
              <Typography>Email: propertylens@gmail.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <PhoneIcon sx={{ mr: 2, color: '#8A2BE2' }} />
              <Typography>Phone Number: 0123456789</Typography>
            </Box>
            <Box mt={2}>
              <IconButton className={classes.socialIcon}><FacebookIcon /></IconButton>
              <IconButton className={classes.socialIcon}><TwitterIcon /></IconButton>
              <IconButton className={classes.socialIcon}><InstagramIcon /></IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} textAlign="center">
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Your Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                placeholder="Your Message"
                name="Message"
                value={formData.Message}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#8A2BE2",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#6A1B9A",
                  },
                }}
              >
                Send Message
              </Button>
              {msg && <Typography color="error" sx={{ mt: 1 }}>{msg}</Typography>}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
