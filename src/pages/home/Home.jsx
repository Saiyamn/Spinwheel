import React, { useRef, useState } from "react";

import {
  Check,
  CheckBox,
  Close,
  MailOutline,
  PhoneOutlined,
} from "@mui/icons-material";

import "./home.scss";
import backgroundFrame from "../../images/backgroundFrame.png";
import advert from "../../images/adv.jpg";
import SpinnerWheel from "../../components/wheel/SpinnerWheel";

const Home = () => {
  const [discountWon, setDiscountWon] = useState("");
  const [coupon, setCoupon] = useState("");
  const [clipboardCopyStatus, setClipboardCopyStatus] = useState(false);
  const [emailCheckStatus, setEmailCheckStatus] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [startGame, setStartGame] = useState(false);

  const emailRef = useRef();

  const GetStarted = () => {
    return (
      <div className="get-started">
        <div className="form-section">
          <img src="/assets/wheel.jpg" alt="static-wheel" />
          {discountWon ? <SuccessMessage /> : <FormValidation />}
        </div>
        <div className="misc-details">
          <img src={advert} alt="ad" />
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    setClipboardCopyStatus(true);
    navigator.clipboard.writeText(coupon);
    setTimeout(() => {
      setClipboardCopyStatus(false);
    }, 3000);
  };

  const closePanelAndStartAgain = () => {
    // copy to clipboard
    copyToClipboard();

    // reset discount and coupon values to prepare for next spin
    setDiscountWon("");
    setCoupon("");
    setEmailCheckStatus(false);
  };

  const SuccessMessage = () => {
    return (
      <div className="success">
        <p className="success-msg">Congrats You Won:</p>
        <h3 className="success-discount-option">{discountWon}</h3>
        <div className="coupon">
          <div className="code">{coupon}</div>
          <div className="copy" onClick={copyToClipboard}>
            {clipboardCopyStatus ? <Check className="icon" /> : "COPY"}
          </div>
        </div>
        <div className="close-btn" onClick={closePanelAndStartAgain}>
          Close Panel & Copy
        </div>
        <p className="discount-validity">
          *You can claim your coupon for 10 minutes only!
        </p>
      </div>
    );
  };

  // Check validity of email, if yes then proceed to spinning the wheel
  const validateAndProceed = () => {
    const email = emailRef.current.value;

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setIsValidEmail(true);

    if (email.match(mailformat)) {
      setEmailCheckStatus(true);

      // Timeout of 2 seconds to mock API request/response time
      setTimeout(() => {
        setStartGame(true);
      }, 1500);
    } else {
      // sets flag to display validation error message
      setIsValidEmail(false);
    }
  };

  const FormValidation = () => {
    return (
      <div className="form-validation">
        <h3>This is how EngageBud looks like in action!</h3>
        <div className="email-section">
          <MailOutline className="icon" />
          <div>
            <h4>Email</h4>
            <input type="email" placeholder="joe@gmail.com" ref={emailRef} />
            <p>{!isValidEmail ? "Inavlid Email" : ""}</p>
          </div>
        </div>
        <div className="phone-section">
          <PhoneOutlined className="icon" />
          <div>
            <h4>Phone Number</h4>
            <input
              type="tel"
              placeholder="123-123-4567"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
          </div>
        </div>
        <div className="agree-disagree-container">
          <CheckBox />
          <p>
            I agree to receiving recurring automated messages at the number I
            have provided. Consent is not a condition to purchase.
          </p>
        </div>
        <div className="form-btn" onClick={validateAndProceed}>
          {emailCheckStatus ? "Loading..." : "Try your luck"}
        </div>
        <div className="conditions">
          <p>*You can spin the wheel only once!</p>
          <p>*If you win, you can claim your coupon for 10 minutes only!</p>
        </div>
        <div className="close">
          <span>No, I don’t feel lucky</span>
          <Close />
        </div>
      </div>
    );
  };
  return (
    <div className="home">
      <div
        className="wheel-container"
        style={{
          backgroundImage: `url(${backgroundFrame})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {startGame ? (
          <SpinnerWheel
            setDiscountWon={setDiscountWon}
            setCoupon={setCoupon}
            setStartGame={setStartGame}
          />
        ) : (
          <GetStarted />
        )}
      </div>
    </div>
  );
};

export default Home;
