import React, { useState, useEffect, useRef, useContext } from "react";
import { Night } from "../App";
import { Samp } from "./Data";
import { GoX } from "react-icons/go";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const StockData = () => {
  const { day, stocks, setStocks } = useContext(Night);
  const { sample, setSample, testPrice, setTestPrice, priceS, alertedS} =
    useContext(Samp);
  const incPriceS = () => {
    priceS.current = setInterval(
      () => setTestPrice((prev) => prev + 1),
      150
    );
  };
  const decPriceS = () => {
    priceS.current = setInterval(
      () => setTestPrice((prev) => prev - 1),
      150
    );
  };
  const clearIncDecPriceS = () => clearInterval(priceS.current);
  
  return (
    <div
      className="stockDataContainer"
    >
      <h2 className="stockHeaders">Live Stock Price</h2>
      <div
        className="stock"
        style={day ? null : { borderBottom: "1px solid #dfd6cc" }}
      >
        <h4 className="stockItem">Stock Name</h4>
        <h4 className="stockItem">Ticker</h4>
        <h4 className="stockItem">Price</h4>
        <h4 className="stockItem">Remove</h4>
      </div>
      {sample ? (
        <div className="stockSample">
          <p className="stockItem">Example Stock</p>
          <p className="stockItem">Test</p>
          <div className="stockItem plusMinusControl">
            <AiOutlineMinus
              className="plusMinus"
              style={day ? null : { color: "white" }}
              onClick={() => setTestPrice(testPrice - 1)}
              onMouseDown={decPriceS}
              onMouseUp={clearIncDecPriceS}
            ></AiOutlineMinus>
            <p>${testPrice}</p>
            <AiOutlinePlus
              className="plusMinus"
              style={day ? null : { color: "white" }}
              onClick={() => setTestPrice(testPrice + 1)}
              onMouseDown={incPriceS}
              onMouseUp={clearIncDecPriceS}
            ></AiOutlinePlus>
          </div>
          <div className="stockItem">
            <GoX className="xButton2" onClick={() => setSample(!sample)}></GoX>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StockData;
