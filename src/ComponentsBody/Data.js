import React, { useContext } from "react";
import StockData from "./StockData";
import { Night } from "../App";
import { GrCircleInformation } from "react-icons/gr";

const Data = () => {
  const { day, info, setInfo } = useContext(Night);
  // Stock States
  // Alert States

  const dayshowInfo = ["infoBox"];
  if (info && !day) {
    dayshowInfo.push("nightInfo");
  }
  if (info) {
    dayshowInfo.push("showInfo");
  }
  if (!info) {
    dayshowInfo.push("hideInfo");
  }

  return (
    <div
      className="bigDataContainer"
      style={
        day
          ? null
          : { border: ".3vh solid #49576a", backgroundColor: "#141e28" }
      }
    >
      <div className="dataTitle">
        <h1>
          Watchlist{" "}
          <GrCircleInformation
            className="info"
            style={day ? null : { filter: "invert(95%)" }}
            onMouseEnter={() => {
              setInfo(true);
            }}
            onMouseLeave={() => {
              setInfo(false);
            }}
          ></GrCircleInformation>
        </h1>
        {/* Info Box */}
        <div className={dayshowInfo.join(" ")}>
          <p style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
            Through the Settings Menu, you can enable or disable alerts, set the
            percentage change you would like to be alerted at, and adjust the
            volume. To try out the alert, set an alert percent and change the
            price on the example stock. To monitor a price increase set a positive percentage or a price higher than the start price (open price) and vice versa for a price decrease.
          </p>
        </div>
      </div>

      <div className="dataContainer">
        <StockData></StockData>
      </div>
    </div>
  );
};

export default Data;
