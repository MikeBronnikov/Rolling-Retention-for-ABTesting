import React from "react";

import './index.scss'

interface Props {
isOpen: boolean
clickHandler: ()=>void
}
export const SelectArrow = (props: Props) => {
  return (
    <>
      <a className={`arrow-icon ${props.isOpen ? 'open' : ''}`} onClick={props.clickHandler}>
        <span className="left-bar"></span>
        <span className="right-bar"></span>
      </a>
    </>
  );
};

export default SelectArrow