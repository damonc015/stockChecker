import React, { useState, useEffect, useRef, useContext,createContext } from "react";
import StockDataExtended from "./StockDataExtended";
import { Night } from "../App";
import { List } from "./index";
import { AiOutlinePlus, AiOutlineMinus, AiFillBell,AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai";
import { FaTrash, FaBellSlash } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { Line } from "react-chartjs-2";

export const Samp = createContext();

const StockData = () => {
  const { day ,sampSettings,setSampSettings} = useContext(Night);
  const { audio,settings,setSettings } = useContext(List);
  // Sample Stock States
  // Turn on Sample
  const [sample, setSample] = useState(true);
  // Set Test Prices
  const [testPrice, setTestPrice] = useState(100);
  const originalTestPrice = useRef(100);
  // Sample Alert States
  // Enable/Disable Alert
  const [enableS, setEnableS] = useState(false);
  // Alert Percent, Price, and Alert State
  const [alertPercentS, setAlertPercentS] = useState(0);
  const [alertPriceS, setAlertPriceS] = useState(100);
  const [alertedS, setAlertedS] = useState(false);
  const [priceOrPercentS,setPriceOrPercentS] = useState(true)
  // Set Volume
  const [volumeS, setVolumeS] = useState(0.5);
  // Show/Hide Settings
  const dayshowSampSettings = ["settingsContainer"];

  if (!sampSettings) {
    dayshowSampSettings.push("hideSettings");
  }
  if (sampSettings) {
    dayshowSampSettings.push("showSettings");
  }
  if (sampSettings && day) {
    dayshowSampSettings.push("daySettings");
  }
  if (sampSettings && !day) {
    dayshowSampSettings.push("nightSettings");
  }

  const enableSamp = (prev) =>{
    setSampSettings(!prev)
  }

  // Chart settings
  const sampLineData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        label: "Example Stock",
        data: [3, 10, 4, 8, 4, 15, 7, 20],
        pointRadius: 0,
        fill: false,
        backgroundColor: day ? "#e9dfd4" : "#141e28",
        borderColor: "#52ad59",
      },
    ],
  };
  const sampLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 6,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Volume
  useEffect(()=>{
    var ringS = setInterval(()=>{
        audio.volume = volumeS;
        if (alertedS) {
          audio.play();
        }
        if (!alertedS) {
          audio.pause();
          audio.currentTime = 0;
        }
    },1000)
    return ()=>{
      clearInterval(ringS)}
  },[alertedS,volumeS])

  // Alert Check
  useEffect(() => {
    if (enableS) {
      if(!priceOrPercentS){
          if (alertPercentS > 0) {
            if (
                testPrice >=
                (alertPercentS/100 * originalTestPrice.current) + originalTestPrice.current
              ) {
                return setAlertedS(true);
              } 
          }

            if (alertPercentS < 0) {
              if (
                testPrice <=
                (alertPercentS/100 * originalTestPrice.current) + originalTestPrice.current
              ) {
                return setAlertedS(true);
              } 
          }

            return setAlertedS(false);
      }

      if(priceOrPercentS){
          if(alertPriceS > originalTestPrice.current){
            if(testPrice >= alertPriceS){
              return setAlertedS(true);
            }
          }
          if(alertPriceS < originalTestPrice.current){
            if(testPrice <= alertPriceS){
              return setAlertedS(true);
            }
          }
          return setAlertedS(false);
      }
        }
      return setAlertedS(false);
  }, [enableS, testPrice, alertPercentS,alertPriceS,priceOrPercentS]);

  return (
    <div className="stockDataContainer">
      <div
        className="stockHeaders"
        style={
          day
            ? null
            : {
                borderBottom: "1px solid #dfd6cc",
                borderTop: "2px solid #dfd6cc",
                backgroundColor: "#1d2d3b",
              }
        }
      >
        <h4 className="stockItemSymbol">Symbol</h4>
        <h4 className="stockItemName">Name</h4>
        <h4 className="stockItem">Live Price</h4>
        <h4 className="stockItemChart">Chart</h4>
        <h4 className="stockItemIcon">Settings</h4>
        <h4 className="stockItemIcon">Remove</h4>
      </div>

      {sample ? (
        <div
          className={alertedS ? "stockSample alertAnimation" : "stockSample"}
          style={day ? null : { borderBottom: "1px solid #dfd6cc" }}
        >
          <p className="stockItemSymbol">TST</p>

          <p className="stockItemName">Example Stock</p>

          <div className="stockItem plusMinusControl">
            <AiOutlineMinus
              className="plusMinus"
              style={day ? null : { color: "white" }}
              onClick={() => setTestPrice(testPrice - 1)}
            ></AiOutlineMinus>
            <p>${testPrice}</p>
            <AiOutlinePlus
              className="plusMinus"
              style={day ? null : { color: "white" }}
              onClick={() => setTestPrice(testPrice + 1)}
            ></AiOutlinePlus>
          </div>

          <div className="stockItemChart">
            <Line
              style={{ height: "5vh" }}
              data={sampLineData}
              options={sampLineOptions}
            ></Line>
          </div>

          <div className="stockItemIcon">
            <BsFillGearFill
              className="gearIcon"
              onClick={() => setSampSettings(enableSamp)}
            ></BsFillGearFill>

            <div className={dayshowSampSettings.join(" ")} onClick={e=>e.stopPropagation()}>
              <div className="settingsItem">Example Stock</div>
              {enableS?(
              <div className="settingsItem">
                <p
                  style={
                    day
                      ? null
                      : {
                          backgroundColor: "#1d2d3b",
                        }
                  }
                >
                 ENABLED
                </p>
                  <AiFillBell
                    className="settingsBell"
                    onClick={() => {
                      setEnableS(!enableS)}}
                  ></AiFillBell>
              </div>):(
              <div className="settingsItem">
                <p
                  style={
                    day
                      ? null
                      : {
                          backgroundColor: "#1d2d3b",
                        }
                  }
                >
                  DISABLED
                </p>
              <FaBellSlash
                className="settingsBell"
                onClick={() => {
                  setEnableS(!enableS)}}
                ></FaBellSlash>
                  </div>)
                  }

              <div className="settingsItem">
                <p
                  style={
                    day
                      ? null
                      : {
                          backgroundColor: "#1d2d3b",
                        }
                  }
                >
                  Alert Price or Percent:
                </p>
                <div className="pricePercentContainer">
                  {priceOrPercentS ? (
                    <div className="pricePercentContent">
                      Price:{" "}
                      <div className="changePricePercent">
                        <AiOutlineArrowLeft
                          onClick={() => {
                            setPriceOrPercentS(!priceOrPercentS);
                          }}
                          className="changeArrows"
                        ></AiOutlineArrowLeft>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <input
                            className="pricePercentForms"
                            type="number"
                            value={alertPriceS}
                            onChange={(e) => {
                              setAlertPriceS(e.target.valueAsNumber);
                            }}
                          />
                        </form>
                        <AiOutlineArrowRight
                          onClick={() => {
                            setPriceOrPercentS(!priceOrPercentS);
                          }}
                          className="changeArrows"
                        ></AiOutlineArrowRight>
                      </div>
                    </div>
                  ) : (
                    <div className="pricePercentContent">
                      Percent:
                      <div className="changePricePercent">
                        <AiOutlineArrowLeft
                          onClick={() => {
                            setPriceOrPercentS(!priceOrPercentS);
                          }}
                          className="changeArrows"
                        ></AiOutlineArrowLeft>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <input
                            className="pricePercentForms"
                            type="number"
                            value={alertPercentS}
                            onChange={(e) => {
                              setAlertPercentS(e.target.valueAsNumber);
                            }}
                          />
                        </form>
                        <AiOutlineArrowRight
                          onClick={() => {
                            setPriceOrPercentS(!priceOrPercentS);
                          }}
                          className="changeArrows"
                        ></AiOutlineArrowRight>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="settingsItem">
                <p
                  style={
                    day
                      ? null
                      : {
                          backgroundColor: "#1d2d3b",
                        }
                  }
                >
                  Volume:
                </p>
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
              </div>
            </div>
          </div>

          <div className="stockItemIcon">
            <FaTrash
              className="trashCan"
              onClick={() => setSample(!sample)}
            ></FaTrash>
          </div>
        </div>
      ) : null}
      <Samp.Provider value={{sample}}>
        <StockDataExtended></StockDataExtended>
      </Samp.Provider>
    </div>
  );
};

export default StockData;
