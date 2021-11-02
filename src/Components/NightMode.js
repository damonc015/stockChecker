import React,{useContext} from 'react';
import {Night} from "../App";
import { BsMoonFill } from "react-icons/bs";

const NightMode = () => {

  const {day,setDay} = useContext(Night);

  return (
    <div className="toggleSwitch">
      <label>
        <button
          className="nightButton"
          style={day ? null : { backgroundColor: "#49576a", color:"white"}}
          type="button"
          onClick={() => {
            setDay(!day);
          }}
        >
          <BsMoonFill style={{margin:".2vh"}}></BsMoonFill>
        </button>
      </label>
    </div>
  );
}

export default NightMode
