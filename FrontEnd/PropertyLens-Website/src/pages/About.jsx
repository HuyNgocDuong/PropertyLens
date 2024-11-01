import React, { useState } from "react";
import "../styles.css";
import aiDataVisualization from "../assets/img/about/662f58e1e6dd5be58d583ec3_AI-data-visualization.jpg";
import baoImage from "../assets/img/about/bao.jpeg";
import folkImage from "../assets/img/about/folk.jpg";
import huyImage from "../assets/img/about/huy.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const About = () => {
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
    const scriptURL = "https://script.google.com/macros/s/AKfycbz_ZKysjiqRnG_VpHd6-WRw-9rRS_zmS18w45iLvTUhcOZIwcRDpe5EwdSyfIwh7SJrNg/exec"; // Replace with your script URL

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formData)
      });
      setMsg("Message sent successfully!");
      setFormData({ Name: "", Email: "", Message: "" }); // Reset form after submission
    } catch (error) {
      setMsg("Failed to send message. Try again later.");
    }
  };

  return (
    <div>
      {/* About Page Content */}
      <div id="about-page-banner">
        <div id="about-gradient-banner">
          <div id="about-banner-content">
            <h1>About Us</h1>
            <h2>Excellent quality houses choices</h2>
          </div>
        </div>
      </div>

      <div id="about-page-content">
        {/* Section 1 */}
        <div id="about-section1">
          <h1 className="about-section-heading">Who We Are</h1>
          <div className="border-line"></div>
          <p className="about-text">
            Welcome to PropertyLens, a reliable platform leading the way in real
            estate advancements. Our group of skilled professionals and experts
            who rely on data is committed to assisting you in confidently
            navigating the real estate market. Using sophisticated AI technology
            and a comprehensive knowledge of market trends, we offer thorough
            property analysis, precise pricing forecasts, and customized
            assistance for a seamless real estate experience.
            <br />
            <br />
            At PropertyLens, we support our clients by providing the information
            and resources needed to make educated choices in a constantly
            changing market.
          </p>
        </div>

        {/* Section 2 */}
        <div id="about-section2">
          <div id="about-section2-text">
            <h1 className="about-section-heading">What We Do</h1>
            <div className="border-line"></div>
            <p className="about-text">
              At PropertyLens, we utilize advanced AI technology to streamline
              the intricacies of the real estate industry. Our platform provides
              insights based on data, such as assessing property values,
              analyzing trends, and giving personalized recommendations that fit
              your specific requirements. Our aim is to offer precise market
              forecasts and practical advice to help you confidently navigate
              real estate transactions, whether you are purchasing, selling, or
              investing. With a dedication to being open and creative, we are
              here to support you through each and every stage.
            </p>
          </div>
          <div id="about-section2-image">
            <img src={aiDataVisualization} alt="AI Data Visualization" />
          </div>
        </div>

        {/* Founders Section */}
        <div id="about-section3">
          <h1 className="about-section-heading">Our Founders</h1>
          <h2>Meet Our Team</h2>
          <div id="about-founders-container">
            <div id="about-founders-box">
              <div className="about-founders-shape">
                <img src={baoImage} alt="Nhu Gia Bao Nguyen" />
              </div>
              <div className="about-founders-text">
                <p className="about-founders-name">Nhu Gia Bao Nguyen</p>
                <p className="about-founders-position">Chief Executive Officer</p>
              </div>
            </div>
            <div id="about-founders-box">
              <div className="about-founders-shape">
                <img src={folkImage} alt="Pattarapol Tantechasa" />
              </div>
              <div className="about-founders-text">
                <p className="about-founders-name">Pattarapol Tantechasa</p>
                <p className="about-founders-position">Chief Technology Officer</p>
              </div>
            </div>
            <div id="about-founders-box">
              <div className="about-founders-shape">
                <img src={huyImage} alt="Ngoc Huy Duong" />
              </div>
              <div className="about-founders-text">
                <p className="about-founders-name">Ngoc Huy Duong</p>
                <p className="about-founders-position">Chief Operating Officer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact">
          <div className="container1">
            <div className="row">
              <div className="contact-left">
                <h1 className="text">Contact Us</h1>
                <div className="border-line"></div>
                <p><i className="fa-solid fa-envelope"></i> Email: propertylens@gmail.com</p>
                <p><i className="fa-solid fa-phone"></i> Phone Number: 0123456789</p>
                <div className="social-icon">
                  <a href="#"><i className="fa-brands fa-facebook"></i></a>
                  <a href="#"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
              <div className="contact-right">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="Name" placeholder="Your Name" required onChange={handleChange} value={formData.Name} />
                  <input type="email" name="Email" placeholder="Your Email" required onChange={handleChange} value={formData.Email} />
                  <textarea name="Message" rows="6" placeholder="Your Message" onChange={handleChange} value={formData.Message}></textarea>
                  <button type="submit" className="submit">Submit</button>
                </form>
                <span id="msg">{msg}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
