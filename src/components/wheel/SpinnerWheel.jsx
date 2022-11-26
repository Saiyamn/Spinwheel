import React from "react";

import "./spinnerwheel.scss";
import SpinWheel from "../../images/spinwheel.png";
import WheelCenter from "../../images/wheelCenter.png";
import Advert from "../../images/adv.jpg";

const SpinnerWheel = ({ setDiscountWon, setCoupon, setStartGame }) => {
  const discountSegments = [
    "30% Sitewide Off",
    "Buy 1 get 1 Free",
    "Free Coffee Mug on Purchase Worth 1000+",
    "Buy 2 Effervescent tablets & get 1 free",
    "Free 50G Tea on purchase of Rs.500",
    "Hot Chocolate free with tea",
  ];

  const couponCode = [
    "XAXPDF20",
    "XFXPDF09",
    "XYXPDF00",
    "XYXZZZ10",
    "ABCZZZ32",
    "XYXLNO15",
  ];

  const spinWheel = () => {
    const totalDegree = Math.PI * 2;
    const segmentDegree = totalDegree / discountSegments.length; // in radians

    const rotationAngle = segmentDegree * (6000 + Math.random() * 5000);
    const wheel = document.querySelector(".spin-wheel");
    wheel.style.transition = "all 10s ease-out";
    wheel.style.transform = `rotate(${rotationAngle}deg)`;

    const angleLeft = rotationAngle % 360;

    const angleCovered = 360 - angleLeft;
    const radiansCovered = angleCovered * 0.0174533;

    // Mapping the rotation covered to discountSegments array index
    const getIndex = () => {
      const roundedRadian = Math.floor(radiansCovered * 10);
      const indexValue = Math.floor(roundedRadian / 10);
      const decimalValue = roundedRadian % 10;

      let newIndex = "";

      if (indexValue === 5) {
        if (decimalValue <= 5) {
          newIndex = 5;
        } else {
          newIndex = 0;
        }
      } else {
        if (decimalValue <= 5) {
          newIndex = indexValue;
        } else {
          newIndex = indexValue + 1;
        }
      }

      return newIndex;
    };

    const index = getIndex();

    wheel.addEventListener("transitionend", () => {
      setDiscountWon(discountSegments[index]);
      setCoupon(couponCode[index]);

      // Timeout for smooth transition to Get started page
      setTimeout(() => {
        setStartGame(false);
      }, 1500);
    });
  };

  return (
    <div className="spinner-wheel">
      <div className="wrapper">
        <div className="wheel-wrapper">
          <div className="wheel-container">
            <img className="spin-wheel" src={SpinWheel} alt="wheel" />
            <img className="wheel-axis" src={WheelCenter} alt="Axis of Wheel" />
          </div>
          <div className="spin-btn" onClick={spinWheel}>
            Spin
          </div>
        </div>
        <div className="ad-container">
          <img src={Advert} alt="advertisement" />
        </div>
      </div>
    </div>
  );
};

export default SpinnerWheel;
