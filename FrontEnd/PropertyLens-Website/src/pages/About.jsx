// import React from "react";
import "../styles.css";
import aiDataVisualization from "../assets/img/about/662f58e1e6dd5be58d583ec3_AI-data-visualization.jpg";
import baoImage from "../assets/img/about/bao.jpeg";
import folkImage from "../assets/img/about/folk.jpg";
import huyImage from "../assets/img/about/huy.jpg";

const About = () => {
  return (
    <div>
      <div id="about-page-banner">
        <div id="about-gradient-banner">
          <div id="about-banner-content">
            <h1>About Us</h1>
            <h2>Excellent quality houses choices</h2>
          </div>
        </div>
      </div>

      <div id="about-page-content">
        <div id="about-section1">
          <h1 className="about-section-heading">Who We Are</h1>
          <div className="border-line"></div>
          <p className="about-text">
            Welcome to HomeLand, a reliable platform leading the way in real
            estate advancements. Our group of skilled professionals and experts
            who rely on data is committed to assisting you in confidently
            navigating the real estate market. Using sophisticated AI technology
            and a comprehensive knowledge of market trends, we offer thorough
            property analysis, precise pricing forecasts, and customized
            assistance for a seamless real estate experience.
            <br />
            <br />
            At HomeLand, we support our clients by providing the information and
            resources needed to make educated choices in a constantly changing
            market.{" "}
          </p>
        </div>
        <div id="about-section2">
          <div id="about-section2-text">
            <h1 className="about-section-heading">What We Do</h1>
            <div className="border-line"></div>
            <p className="about-text">
              At HomeLand, we utilize advanced AI technology to streamline the
              intricacies of the real estate industry. Our platform provides
              insights based on data, such as assessing property values,
              analyzing trends, and giving personalized recommendations that fit
              your specific requirements. Our aim is to offer precise market
              forecasts and practical advice to help you confidently navigate
              real estate transactions, whether you are purchasing, selling, or
              investing. With a dedication to being open and creative, we are
              here to support you through each and every stage.{" "}
            </p>
          </div>
          <div id="about-section2-image">
            <img src={aiDataVisualization} alt="AI Data Visualization" />
          </div>
        </div>
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
                <p className="about-founders-position">
                  Chief Executive Officer
                </p>
              </div>
            </div>

            <div id="about-founders-box">
              <div className="about-founders-shape">
                <img src={folkImage} alt="Pattarapol Tantechasa" />
              </div>
              <div className="about-founders-text">
                <p className="about-founders-name">Pattarapol Tantechasa</p>
                <p className="about-founders-position">
                  Chief Technology Officer
                </p>
              </div>
            </div>

            <div id="about-founders-box">
              <div className="about-founders-shape">
                <img src={huyImage} alt="Ngoc Huy Duong" />
              </div>
              <div className="about-founders-text">
                <p className="about-founders-name">Ngoc Huy Duong</p>
                <p className="about-founders-position">
                  Chief Operating Officer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
