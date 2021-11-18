import React, { useEffect, useContext } from "react";
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
  const { day,sampSettings,setSampSettings,settings,setSettings} = useContext(Night);
  const { sample } = useContext(Samp);
  const {
    stockPrice,
    setStockPrice,
    stockList,
    setStockList,
    storePriceAllHistory,
    setStorePriceAllHistory,
    enableRD,
    setEnableRD,
    alertPercentRD,
    setAlertPercentRD,
    alertPriceRD,
    setAlertPriceRD,
    alertedRD,
    setAlertedRD,
    priceOrPercentRD,
    setPriceOrPercentRD,
    volumeRD,
    setVolumeRD,
    trimLineDataHistory,
  } = useContext(List);

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
    let copySettingsTrue = [...settings].fill(false);
    copySettingsTrue[index] = true;
    return setSettings(copySettingsTrue);
  };

  const updateEnable = (index) =>{
    let copyEnable = [...enableRD];
    copyEnable[index] = false;
    return setEnableRD(copyEnable);
  }

  const updateDisable = (index) =>{
    let copyDisable = [...enableRD];
    copyDisable[index] = true;
    return setEnableRD(copyDisable);
  }

  // Price or Percent
  const updatePrice = (index)=>{
    let copyPrice = [...priceOrPercentRD];
    copyPrice[index] = false;
    return setPriceOrPercentRD(copyPrice)
  }
  const updatePercent = (index)=>{
    let copyPercent = [...priceOrPercentRD];
    copyPercent[index] = true;
    return setPriceOrPercentRD(copyPercent)
  }
  // Alert Price/Percent
  const updateAlertPrice = (num,index) =>{
    let copyAlertPrice = [...alertPriceRD];
    copyAlertPrice[index] = num;
    return setAlertPriceRD(copyAlertPrice)
  }
  const updateAlertPercent = (num,index) =>{
    let copyAlertPercent = [...alertPercentRD];
    copyAlertPercent[index] = num;
    return setAlertPercentRD(copyAlertPercent)
  }
  // Volume
  const updateVolume = (num,index) =>{
    let copyVolume = [...volumeRD];
    copyVolume[index] = num;
    return setVolumeRD(copyVolume)
  }

  console.log("StockList",stockList)
  console.log("StockPrice",stockPrice)
  console.log("EnableRD",enableRD)
  console.log("AlertPercentRD",alertPercentRD)
  console.log("AlertPriceRD",alertPriceRD)
  console.log("AlertedRD",alertedRD)
  console.log("PriceOrPercent",priceOrPercentRD)
  console.log("Volume",volumeRD)
  console.log("Settings",settings)

  const removeThis = (ticker,index) => {
    setStockList(
      [...stockList].filter((val) => {
        if (val.Tick !== ticker) return val;
      })
    );
    setStorePriceAllHistory(
      [...storePriceAllHistory].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setStockPrice(
      [...stockPrice].filter((val,i)=>{
        if(i !== index) return val;
      })
    )
    setEnableRD(
      [...enableRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setAlertPercentRD(
      [...alertPercentRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setAlertPriceRD(
      [...alertPriceRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setAlertedRD(
      [...alertedRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setPriceOrPercentRD(
      [...priceOrPercentRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setVolumeRD(
      [...volumeRD].filter((val,i) => {
        if (i !== index) return val;
      })
    );
    setSettings(
      [...settings].filter((val,i) => {
        if (i !== index) return val;
      })
    );
  };

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
    if (settings.includes(true)) {
      setSampSettings(false);
    }
    return;
  }, [settings]);
  
  useEffect(()=>{
    if(sampSettings){
      setSettings([...settings].fill(false))
    }
  },[sampSettings])

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
                ${stockPrice[index]}
              </p>

              <div className="stockItemChart">
                <Line  
                 data={trimLineDataHistory?{
                      labels:trimLineDataHistory[index],
                      datasets: [
                        {
                          label: val.Tick,
                          data: trimLineDataHistory[index],
                          pointRadius: 0,
                          fill: false,
                          backgroundColor: day ? "#e9dfd4" : "#141e28",
                          borderColor: "#52ad59",
                        },
                      ],
                    }:{
                      labels: [1,2,3,4,5],
                      datasets: [
                        {
                          label: "ABC",
                          data: [1,2,3,4,5],
                          pointRadius: 0,
                          fill: false,
                          backgroundColor: day ? "#e9dfd4" : "#141e28",
                          borderColor: "orange"
                        },
                      ]
                    }}
                options={lineOptions}>
                </Line>
                </div>

              <div className="stockItemIcon">
                <BsFillGearFill
                  className="gearIcon"
                  onClick={() => updateSettings(settings[index], index)}
                ></BsFillGearFill>

                <div className={settings[index]?
                  (day?"settingsContainerAlt showSettings daySettings":"settingsContainerAlt showSettings nightSettings")
                  :(day?"settingsContainerAlt hideSettings daySettings":"settingsContainerAlt hideSettings nightSettings")}
                  onClick={e=>e.stopPropagation()}>
                  
                  <div className="settingsItem">{val.Tick}</div>

                  {enableRD[index]?(
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
                        onClick={() => updateEnable(index)}
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
                        onClick={() => updateDisable(index)}
                      ></FaBellSlash>
                  </div>)}

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
                              onClick={() => updatePrice(index)}
                              className="changeArrows"
                            ></AiOutlineArrowLeft>
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                className="pricePercentForms"
                                type="number"
                                value={alertPriceRD[index]}
                                onChange={(e) => {
                                  updateAlertPrice(e.target.valueAsNumber,index);
                                }}
                              />
                            </form>
                            <AiOutlineArrowRight
                              onClick={() => updatePrice(index)}
                              className="changeArrows"
                            ></AiOutlineArrowRight>
                          </div>
                        </div>
                      ) : (
                        <div className="pricePercentContent">
                          Percent:
                          <div className="changePricePercent">
                            <AiOutlineArrowLeft
                              onClick={() => updatePercent(index)}
                              className="changeArrows"
                            ></AiOutlineArrowLeft>
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                className="pricePercentForms"
                                type="number"
                                value={alertPercentRD[index]}
                                onChange={(e) => {
                                  updateAlertPercent(e.target.valueAsNumber,index);
                                }}
                              />
                            </form>
                            <AiOutlineArrowRight
                              onClick={() => updatePercent(index)}
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
                      value={volumeRD[index]}
                      onChange={(e) => {
                      updateVolume(e.target.valueAsNumber,index);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="stockItemIcon">
                <FaTrash
                  className="trashCan"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeThis(Tick,index)}}
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
