import React from "react";
import IconNavbar from "../assets/icon-navbar.png";

const MenuGiftIcon = ({ size = 24, className = "" }) => {
  return (
    <img 
      src={IconNavbar} 
      alt="Menu" 
      style={{ width: size, height: 'auto' }} 
      className={className} 
    />
  );
};

export default MenuGiftIcon;
