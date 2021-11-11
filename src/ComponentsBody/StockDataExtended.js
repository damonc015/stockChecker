import React, { useState, useEffect, useContext } from "react";
import { Night } from "../App";
import { List } from "./index";
import { Samp } from "./StockData";
import { Line } from "react-chartjs-2";
import {
  AiFillBell,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { FaTrash, FaBellSlash } from "react-icons/fa";

const StockDataExtended = () => {
  const { day } = useContext(Night);
  const { sample, sampSettings, setSampSettings } = useContext(Samp);
  const {
    stocks,
    stockList,
    setStockList,
    storePriceAllHistory,
    setStorePriceAllHistory,
  } = useContext(List);

  // Alert States
  // Enable/Disable Alert
  const [enableRD, setEnableRD] = useState([]);
  // Alert Percent, Price, and Alert State
  const [alertPercentRD, setAlertPercentRD] = useState([]);
  const [alertPriceRD, setAlertPriceRD] = useState([]);
  const [alertedRD, setAlertedRD] = useState([]);
  const [priceOrPercentRD, setPriceOrPercentRD] = useState([]);
  // Set Volume
  const [volumeRD, setVolumeRD] = useState([]);
  // Show/Hide Settings
  const [settings, setSettings] = useState([]);
  const dayshowSettings = ["settingsContainer"];

  console.log(settings);
  console.log(sampSettings)
  //   console.log(enableRD);
//   console.log(stockList);
  //   Chart Settings
  const [lineData, setLineData] = useState("");
  const lineOptions = {
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

  const updateSettings = (val, index) => {
    if(val){
        let copySettingsFalse = [...settings]
        copySettingsFalse[index]=false;
        return setSettings(copySettingsFalse);
    }
    let copySettingsTrue = settings.fill(false);
    copySettingsTrue[index] = true;
    return setSettings(copySettingsTrue);
  };

  const removeThis = (ticker) => {
    setStockList(
      stockList.filter((val) => {
        if (val.Tick === ticker) return null;
        return val;
      })
    );
  };

  useEffect(() => {
    stockList.map((val) => {
      // Chart
      setLineData([
        ...lineData,
        {
          labels: [1, 2, 3],
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
        },
      ]);
      //   Enable
      setEnableRD([...enableRD, true]);
      // Alert States
      setAlertPercentRD([...alertPercentRD, 0]);
      setAlertPriceRD([...alertPriceRD, 0]);
      setAlertedRD([...alertedRD, false]);
      setPriceOrPercentRD([...priceOrPercentRD, true]);
      setVolumeRD([...volumeRD, 0.5]);
      // Settings
      setSettings([...settings, false]);
      return;
    });
  }, [stockList]);

  //   // Volume
  //   useEffect(() => {
  //     var ringS = setInterval(() => {
  //       audio.volume = volumeS;
  //       if (alertedRD) {
  //         audio.play();
  //       }
  //       if (!alertedRD) {
  //         audio.pause();
  //         audio.currentTime = 0;
  //       }
  //     }, 1000);
  //     return () => {
  //       clearInterval(ringS);
  //     };
  //   }, [alertedRD, volumeRD]);

  // //   Alert Check
  //   useEffect(() => {
  //     if (enableRD) {
  //       if (!priceOrPercentRD) {
  //         if (alertPercentRD > 0) {
  //           if (
  //             testPrice >=
  //             (alertPercentS / 100) * originalTestPrice.current +
  //               originalTestPrice.current
  //           ) {
  //             return setAlertedRD(true);
  //           }
  //         }

  //         if (alertPercentS < 0) {
  //           if (
  //             testPrice <=
  //             (alertPercentS / 100) * originalTestPrice.current +
  //               originalTestPrice.current
  //           ) {
  //             return setAlertedS(true);
  //           }
  //         }

  //         return setAlertedS(false);
  //       }

  //       if (priceOrPercentS) {
  //         if (alertPriceS > originalTestPrice.current) {
  //           if (testPrice >= alertPriceS) {
  //             return setAlertedS(true);
  //           }
  //         }
  //         if (alertPriceS < originalTestPrice.current) {
  //           if (testPrice <= alertPriceS) {
  //             return setAlertedS(true);
  //           }
  //         }
  //         return setAlertedS(false);
  //       }
  //     }
  //     return setAlertedS(false);
  //   }, [enableRD, testPrice, alertPercentRD, alertPriceRD, priceOrPercentRD]);

  // Settings
  useEffect(() => {
    if (settings[0]===true) {
        console.log("hi")
    //   setSampSettings(false);
    }
    if (sampSettings === true) {
        console.log("bye")
    //   setSettings(settings.fill(false));
    }
    return;
  }, [settings]);

  if (stockList.length > 0) {
    return (
      <>
        {stockList.map((val, index) => {
          const { Tick, Name } = val;
          const altColors = sample ? !Boolean(index % 2) : Boolean(index % 2);

          return (
            <div
              className={
                altColors
                  ? day
                    ? "stockAlt"
                    : "stockAltNight"
                  : day
                  ? "stock"
                  : "stockNight"
              }
              key={`${val}_${index}_${new Date()}`}
            >
              <p className="stockItemSymbol"> {Tick}</p>

              <p className="stockItemName">{Name}</p>

              <p className="stockItem">
                {/* {val.data ? val.data[0].p.toFixed(2) : "-"} */}
              </p>

              <div className="stockItemChart">{/* <Line></Line> */}</div>

              <div className="stockItemIcon">
                <BsFillGearFill
                  className="gearIcon"
                  onClick={() => updateSettings(settings[index], index)}
                ></BsFillGearFill>

                <div className={settings[index]?(day?"settingsContainer showSettings daySettings":"settingsContainer showSettings nightSettings"):(day?"settingsContainer hideSettings daySettings":"settingsContainer hideSettings nightSettings")}>
                  <div className="settingsItem">{val.Tick}</div>
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
                      Enable/Disable:
                    </p>
                    {enableRD[index] ? (
                      <AiFillBell
                        className="settingsBell"
                        // onClick={() => setEnableS(!enableS)}
                      ></AiFillBell>
                    ) : (
                      <FaBellSlash
                        className="settingsBell"
                        // onClick={() => setEnableRD(!enableS)}
                      ></FaBellSlash>
                    )}
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
                      Alert Price or Percent:
                    </p>
                    <div className="pricePercentContainer">
                      {priceOrPercentRD[index] ? (
                        <div className="pricePercentContent">
                          Price:{" "}
                          <div className="changePricePercent">
                            <AiOutlineArrowLeft
                            //   onClick={() => {
                            //     setPriceOrPercentS(!priceOrPercentS);
                            //   }}
                              className="changeArrows"
                            ></AiOutlineArrowLeft>
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                className="pricePercentForms"
                                type="number"
                                // value={alertPriceRD[index]}
                                // onChange={(e) => {
                                //   setAlertPriceS(e.target.valueAsNumber);
                                // }}
                              />
                            </form>
                            <AiOutlineArrowRight
                            //   onClick={() => {
                            //     setPriceOrPercentS(!priceOrPercentS);
                            //   }}
                              className="changeArrows"
                            ></AiOutlineArrowRight>
                          </div>
                        </div>
                      ) : (
                        <div className="pricePercentContent">
                          Percent:
                          <div className="changePricePercent">
                            <AiOutlineArrowLeft
                            //   onClick={() => {
                            //     setPriceOrPercentS(!priceOrPercentS);
                            //   }}
                              className="changeArrows"
                            ></AiOutlineArrowLeft>
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                className="pricePercentForms"
                                type="number"
                                // value={alertPercentRD[index]}
                                // onChange={(e) => {
                                //   setAlertPercentS(e.target.valueAsNumber);
                                // }}
                              />
                            </form>
                            <AiOutlineArrowRight
                            //   onClick={() => {}}
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
                    //   value={volumeRD[index]}
                      // onChange={(e) => {
                      // setVolumeS(e.target.valueAsNumber);
                      // }}
                    />
                  </div>
                </div>
              </div>

              <div className="stockItemIcon">
                <FaTrash
                  className="trashCan"
                  onClick={() => removeThis(Tick)}
                ></FaTrash>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return <div></div>;
  }
};

export default StockDataExtended;
