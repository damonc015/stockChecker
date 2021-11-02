import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import Alert from "./Alert";
import StockData from "./StockData";
import { Night } from "../App";
import { GrCircleInformation } from "react-icons/gr";

export const Samp = createContext();

const Data = () => {
  const { day, info, setInfo } = useContext(Night);
  // Sample Stock States
  const [sample, setSample] = useState(true);
  const originalTestPrice = useRef(100);
  const [testPrice, setTestPrice] = useState(100);
  const priceS = useRef(0);
  // Sample Alert States
  const [enableS, setEnableS] = useState(true);
  const [alertPercentS, setAlertPercentS] = useState(0);
  const [volumeS, setVolumeS] = useState(0.5);
  const [alertedS, setAlertedS] = useState(false);
  // Stock States
  // Alert States

  useEffect(() => {
    if (enableS) {
      (function checkPercentS() {
        if (alertPercentS > 0) {
          if (
            testPrice >=
            alertPercentS * originalTestPrice + originalTestPrice
          ) {
            return setAlertedS(true);
          } else {
            return setAlertedS(false);
          }
        } else if (alertPercentS < 0) {
          if (
            testPrice <=
            alertPercentS * originalTestPrice + originalTestPrice
          ) {
            return setAlertedS(true);
          } else {
            return setAlertedS(false);
          }
        } else {
          return setAlertPercentS(false);
        }
      })()
    } else {
      return setAlertPercentS(false);
    }
  }, [enableS, testPrice, alertPercentS]);

  return (
    <Samp.Provider
      value={{
        sample,
        setSample,
        testPrice,
        setTestPrice,
        enableS,
        setEnableS,
        volumeS,
        setVolumeS,
        alertPercentS,
        setAlertPercentS,
        priceS,
        alertedS,
      }}
    >
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
              onClick={() => {
                setInfo(!info);
              }}
            ></GrCircleInformation>
          </h1>
          <div
            className="infoBox"
            style={
              info
                ? null
                : {
                    opacity: "0",
                    height: "0",
                    width: "0",
                    marginBottom: "0",
                    zIndex: "-1",
                  }
            }
          >
            <p style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
              Through the Adjust Alerts Menu, you can enable or disable alerts,
              set the percentage change you would like to be alerted at, and
              adjust the volume. To simulate being alerted, set an alert percent
              and change the price on the sample stock.
            </p>
          </div>
        </div>
        <div className="dataContainer">
          <StockData></StockData>
          <Alert></Alert>
        </div>
      </div>
    </Samp.Provider>
  );
};

export default Data;
