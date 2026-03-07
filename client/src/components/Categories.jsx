import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarIcon from  "../images/car-icon.png"
import MobileIcon from  "../images/Mobile-phone-icon.png"
import LaptopIcon from  "../images/laptop-icon.png"
import BikeIcon from  "../images/motorcycle-icon.png"
import GamingIcon from "../images/gaming-icon.png"
import HomeApplianceIcon from "../images/home-appliance-icon.png"
import Title from "./Title";

const Categories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
    <Title content = "Browse By Category"/>
    <div className="carousel">
      <Carousel responsive={responsive}>
        <div className="carousel-card">
            <img src={MobileIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={LaptopIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={BikeIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={HomeApplianceIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={CarIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={GamingIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={HomeApplianceIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
        <div className="carousel-card">
            <img src={HomeApplianceIcon} alt="Mobile" />
            <h3 className="categories-title">Mobile Phone</h3>
        </div>
      </Carousel>
    </div>
    </>
  );
};

export default Categories;
