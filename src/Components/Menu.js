import React,{useContext} from 'react';
import { Night } from "../App";
import { IoIosArrowUp } from "react-icons/io";

const Menu = () => {

    const { menu, setMenu } = useContext(Night);

    return (
      <div className="navMenu">
        <IoIosArrowUp
          className="arrowIcon"
          onClick={() => 
            setMenu(!menu)
        }
        ></IoIosArrowUp>
      </div>
    );
}

export default Menu
