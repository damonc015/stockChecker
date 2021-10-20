import React,{useContext} from 'react';
import {Night} from "../App";
import { BsMoon } from "react-icons/bs";

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
          <BsMoon></BsMoon>
        </button>
      </label>
    </div>
  );
}

export default NightMode
