import React, { useContext } from "react";
import { List } from "./index";
import { Night } from "../App";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";
import { Line } from "react-chartjs-2";

const CurrentTick = () => {
  // Global states
  const { day, settings, setSettings } = useContext(Night);
  // Body states
  const {
    stockPrice,
    setStockPrice,
    currentStock,
    setCurrentStock,
    stockList,
    setStockList,
    storePriceHistory,
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
    socket,
  } = useContext(List);

  // Current Stock Line Data and Label
  const lineDataData = storePriceHistory
    ? storePriceHistory
        .filter((val, index) => {
          return index % 3 === 0;
        })
        .map((val) => {
          return val.close;
        })
    : [];

  const lineDataLabel = storePriceHistory
    ? storePriceHistory
        .filter((val, index) => {
          return index % 3 === 0;
        })
        .map((val) => {
          return val.label;
        })
    : [];

  // Current Stock open, high, and low price
  const openPrice = storePriceHistory
    ? Number.parseFloat(storePriceHistory[0].open).toFixed(2)
    : "-";
  const highPrice = storePriceHistory
    ? Number.parseFloat(storePriceHistory[0].high).toFixed(2)
    : "-";
  const lowPrice = storePriceHistory
    ? Number.parseFloat(storePriceHistory[0].low).toFixed(2)
    : "-";
  const currentIsPositive =
    lineDataData[0] > lineDataData[lineDataData.length - 1] ? "#52ad59" : "red";

  // Current Stock Line chart data and options
  const currentLineData = {
    labels: lineDataLabel.reverse(),
    datasets: [
      {
        label: currentStock ? currentStock.symbol : "ABC",
        data: lineDataData.reverse(),
        pointRadius: 0,
        fill: false,
        backgroundColor: day ? "#e9dfd4" : "#141e28",
        borderColor: currentIsPositive,
      },
    ],
  };

  const currentLineDataOptions = {
    responsive: true,
    aspectRatio: 1.5,
    scales: {
      x: {
        grid: {
          display: false,
          color: day ? "#7a7a7a" : "#858585",
        },
        ticks: {
          color: day ? "black" : "white",
        },
      },
      y: {
        grid: {
          color: day ? "#7a7a7a" : "#858585",
        },
        ticks: {
          color: day ? "black" : "white",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: day ? "black" : "white",
        },
      },
      title: {
        display: true,
        text: "Price History (6 Months)",
      },
    },
  };

  // Add/Remove to Watchlist
  const add = () => {
    if (stockList.filter((val) => val.Tick === currentStock.symbol).length > 0)
      return setCurrentStock("");

    setStockList([
      ...stockList,
      { Tick: currentStock.symbol, Name: currentStock.name },
    ]);
    setStorePriceAllHistory([
      ...storePriceAllHistory,
      { Symbol: currentStock.symbol, History: storePriceHistory },
    ]);

    //   Enable
    setEnableRD([...enableRD, false]);
    // Alert States
    setAlertPercentRD([...alertPercentRD, 0]);
    setAlertPriceRD([...alertPriceRD, 0]);
    setAlertedRD([...alertedRD, false]);
    setPriceOrPercentRD([...priceOrPercentRD, true]);
    setVolumeRD([...volumeRD, 0.5]);
    // Price
    setStockPrice([...stockPrice, 0]);
    // Settings
    setSettings([...settings, false]);

    // Subscribe for updates on this stock
    socket.current.send(JSON.stringify({ type: "subscribe", symbol: currentStock.symbol }))

    setCurrentStock("");
  };
  const remove = () => {
    setCurrentStock("");
  };

  if (currentStock) {
    return (
      <div
        className="currentContainer"
        style={
          day
            ? null
            : { backgroundColor: "#141e28", border: ".3vh solid #49576a" }
        }
      >
        <div className="currentStockData">
          <div className="sdataContainer">
            <h2 className="data1">
              {currentStock.name} ({currentStock.symbol})
            </h2>
            <h2 className="data">
              Last Price : ${Number.parseFloat(currentStock.price).toFixed(2)}
            </h2>
            <h2 className="data">Open Price: ${openPrice}</h2>
            <h2 className="data">High: ${highPrice}</h2>
            <h2 className="data">Low: ${lowPrice}</h2>
          </div>
          <div className="chartContainer">
            <Line
              data={currentLineData}
              options={currentLineDataOptions}
            ></Line>
          </div>
        </div>

        <div className="acceptStockContainer">
          <h3 className="caption">Add Stock to Watchlist</h3>
          {storePriceHistory ? (
            <div className="acceptStock">
              <GoCheck
                className="checkButton"
                onClick={add}
                style={
                  day
                    ? null
                    : { border: "white", background: "white", color: "black" }
                }
              ></GoCheck>
              <GoX
                className="xButton"
                onClick={remove}
                style={
                  day
                    ? null
                    : { border: "white", background: "white", color: "black" }
                }
              ></GoX>
            </div>
          ) : (
            <div className="acceptStockContainer" style={{paddingTop:"1vh"}}>
              <p>Only US stocks can be added</p>
              <GoX
                className="xButton2"
                onClick={remove}
                style={
                  day
                    ? null
                    : { border: "white", background: "white", color: "black" }
                }
              ></GoX>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CurrentTick;
