import React from "react";
import "./Header.scss";
import { IoIosArrowDown } from "react-icons/io";

const ActionButtons = ({ title, icon, filter }) => {
  return (
    <div className="action-button-container">
      {icon}
      <p className="action-button-title">{title}</p>
      {filter && <IoIosArrowDown />}
    </div>
  );
};

export default ActionButtons;
