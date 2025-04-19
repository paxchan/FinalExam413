import { useEffect, useState } from "react";
import "./LandingPage.css";

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="carousel">
          <div className="carousel-images">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Talent ${index + 1}`}
                className={index === currentIndex ? "active" : ""}
              />
            ))}
          </div>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="landing-right">
        <img
          src="/images/stars_talent_agency_logo.png"
          alt="Stars Talent Agency Logo"
          className="logo-img"
        />
        <p className="slogan">Shining a spotlight on extraordinary talent</p>
        <button
          className="find-talent-btn"
          onClick={() => (window.location.href = "/home")}
        >
          Find Talent
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
