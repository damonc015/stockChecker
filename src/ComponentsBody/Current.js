import React, { useEffect, useContext } from "react";
import { List } from "./index";
import { Night } from "../App";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";
import { Line } from "react-chartjs-2";

const CurrentTick = () => {
  // Global states
  const { day } = useContext(Night);
  // Body states
  const {
    currentStock,
    setCurrentStock,
    stocks,
    setStocks,
    storePriceHistory,
  } = useContext(List);

  // storePriceHistory.map((val) => {
  //   return val.close})
const isPositive = ()=>{
    if(lineData.datasets[0].data[0]>lineData.datasets[0].data[data.length-1]){
    console.log("green")
  }else{
    console.log("red")
  }
}

  const lineData = {
    labels:[2,3,4,5,6,7,8,9,10],
    datasets: [
      {
        label: currentStock.symbol,
        data: [1,2,3,4,2],
        fill: false,
        backgroundColor: day ? "black" : "white",
        borderColor: day ? "black" : "white",
      }
    ]
  };

  const lineDataOptions = {
    options: {
      responsive: true,
      aspectRatio: 2,
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },
        ],
      },
    },
  };

  // Add/Remove to Watchlist
  const add = () => {
    setStocks([...currentStock.symbol]);
    setCurrentStock("");
    console.log(stocks);
  };
  const remove = () => {
    setCurrentStock("");
  };

  //   useEffect(()=>{

  // },[currentStock]);

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
            <h2 className="data">
              {currentStock.name} ({currentStock.symbol})
            </h2>
            <h2 className="data">Last Price : ${currentStock.price}</h2>
          </div>
          <div className="chartContainer">
            <Line data={lineData} options={lineDataOptions}></Line>
          </div>
        </div>

        <div className="acceptStockContainer">
          <h3 className="caption">Add Stock to Watchlist</h3>
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
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CurrentTick;
