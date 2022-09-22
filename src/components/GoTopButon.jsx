import React, { useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

const GoTopButon = () => {
  // useState to show or not button
  const [showButton, setShowButton] = useState(false);

  // decide to show or not button on site
  const toggleButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 250) {
      setShowButton(true);
    } else if (scrolled <= 250) {
      setShowButton(false);
    }
  };
  // scroll to top site
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // listen event to show button
  window.addEventListener("scroll", toggleButton);

  return (
    // render button on site
    <div
      className="scroll-top-button"
      style={{ display: showButton ? "flex" : "none" }}
    >
      <BiArrowToTop onClick={scrollToTop} />
    </div>
  );
};

export default GoTopButon;
