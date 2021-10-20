import React, { useContext } from "react";
import { Night } from "../App";
import { AiFillBell } from "react-icons/ai";
import { Samp } from "./Data";
import { FaBellSlash } from "react-icons/fa";

const Alert = () => {
  const { day } = useContext(Night);
  const {
    sample,
    enableS,
    setEnableS,
    alertPercentS,
    setAlertPercentS,
    volumeS,
    setVolumeS,
  } = useContext(Samp);

  return (
    // Container
    <div
      className="alertContainer"
      style={
        day
          ? null
          : {
              backgroundColor: "#343e4b",
              boxShadow: "1rem .75rem .5px #49576a",
            }
      }
    >
      {/* Header */}
      <h2
        className="stockHeaders"
        style={day ? null : { backgroundColor: "#49576a" }}
      >
        Adjust Alerts
      </h2>

      {/* Content Header*/}
      <div
        className="alert"
        style={day ? null : { borderBottom: "1px solid #dfd6cc" }}
      >
        <h4 className="alertItem">Enable/Disable Alert</h4>
        <h4 className="alertItem">Alert Percent</h4>
        <h4 className="alertItem">Alert Volume</h4>
      </div>

      {/* Content Sample */}
      {sample?
      <div
        className={alertPercentS?"alert alertAnimation":"alert"}
        style={day ? null : { borderBottom: "1px solid #dfd6cc" }}
      >
        {/* Enable/Disable */}
        <div className="alertItem">
          <button
            className="enableDisable"
            style={
              enableS
                ? null
                : { backgroundColor: "rgb(255,86,86)", color: "white" }
            }
            onClick={() => setEnableS(!enableS)}
          >
            {enableS ? "Enabled" : "Disabled"}
            {enableS ? (
              <AiFillBell style={{ margin: "0 0 -.25vh .5vh" }}></AiFillBell>
            ) : (
              <FaBellSlash style={{ margin: "0 0 -.25vh .5vh" }}></FaBellSlash>
            )}
          </button>
        </div>
        {/* Alert Percent */}
        <div className="alertPercent alertItem">
          <p>{alertPercentS}</p>
          <form onSubmit={(e)=>e.preventDefault()}>
          <input
            type="number"
            className="alertItem"
            min={-10}
            max={10}
            step={0.01}
            value={alertPercentS}
            onChange={(e) => {
              setAlertPercentS(e.target.valueAsNumber);
            }} 
          />
          </form>
        </div>
        {/* Volume */}
        <input
          type="range"
          className="alertItem"
          min={0}
          max={1}
          step={0.01}
          value={volumeS}
          onChange={(e) => {
            setVolumeS(e.target.valueAsNumber);
          }}
        />
      </div>:null}
    </div>
  );
};

export default Alert;
