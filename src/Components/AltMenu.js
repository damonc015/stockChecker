import React, { useContext } from "react";
import { Night } from "../App";
import { IoIosArrowDown } from "react-icons/io";

const AltMenu = () => {

    const{menu, setMenu} = useContext(Night);

  return (
    <div className="altNavMenu">
        <IoIosArrowDown className="arrowIcon"
          onClick={() => 
            setMenu(!menu)}>
        </IoIosArrowDown>
    </div>
  );
};

export default AltMenu;
