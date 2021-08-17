import React from "react";

import MagnifyingGlass from "../../assets/images/MagnifyingGlass.svg";
import Avatar from "../../assets/images/Avatar.svg";
import Exit from "../../assets/images/Exit.svg";
import "./header.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__wrap">
        <a className="header__name">AB TEST REAL</a>
        <div className="header__search">
          <img
            className="header__search-img"
            src={MagnifyingGlass}
            alt="Magnifying glass"
          />
          <input type="text" className="header__search-input" />
        </div>
      </div>
      <div className="header__wrap">
        <img src={Avatar} alt="avatar" />
        <img className="header__exit-btn" src={Exit} alt="Exit" />
      </div>
    </div>
  );
};

export default Header;
