import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import Search from "./Search";
import Data from "./Data";
import CurrentTick from "./Current";
import { Night } from "../App";
import sound from "./Fishing-bell-sound-effect.mp3";

export const List = createContext();

const Index = () => {
  const { search, stockNames, setStockNames } = useContext(Night);
  // Finnhub WebSocket Api Key
  const apiKey = "c55l1nqad3icdhg1270g";
  // Symbols added to watchlist
  const [stockList, setStockList] = useState([]);
  // Preview Current Stock
  const [currentStock, setCurrentStock] = useState("");
  //Stock List
  const [storeData, setStoreData] = useState([]);
  // Current Stock Info
  const [storePriceHistory, setStorePriceHistory] = useState("");
  // All added stocks info
  const [storePriceAllHistory, setStorePriceAllHistory] = useState([]);
  // Finnhub WebSocket
  const socket = useRef("");
  const webSocketData = useRef("");
  const filteredWS = useRef("");
  // Stock Names Api Key
  const apiKeyNames = "365fdc617d44b4b70556e939fbbb42f3";
  // Stock Prices
  const [stockPrice, setStockPrice] = useState([]);
  // Alarm Sound
  const audio = new Audio(sound);
  const dateRange = useRef(0);
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

  //   Chart Settings
  const lineDataHistory = storePriceAllHistory
    ? storePriceAllHistory.filter(val => {
        if (val.hasOwnProperty("History")) {
          return val;
        }
      }).map(val=>{
        return val.History.map(val=>{
          return Number.parseFloat(val.close).toFixed(2);
        });
      })
    : null;

  const trimLineDataHistory = storePriceAllHistory
    ? lineDataHistory.map((val) => {
        return val.slice(38).reverse();
      })
    : null;

  // Date Range for Api
  const findDateRange = () => {
    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth() + 1;
    if (todayMonth < 10) {
      todayMonth = `0${todayMonth}`;
    }
    let todayDay = todayDate.getDate();
    if (todayDay < 10) {
      todayDay = `0${todayDay}`;
    }
    const lastSixMonths = todayMonth - 6;
    dateRange.current = `from=${todayYear}-${lastSixMonths}-${todayDay}&to=${todayYear}-${todayMonth}-${todayDay}`;
  };

  // Fetch All Stocks
  useEffect(() => {
    // Find Date Range for Current Stock
    findDateRange();
    const url = `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=${apiKeyNames}`;
    let controller = new AbortController();
    (async () => {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      const allNames = await response.json();
      setStoreData(allNames);
    })();
    return () => controller?.abort();
  }, []);

  // Connect to current stock
  useEffect(() => {
    if (currentStock) {
      try {
        const historyURL = `https://financialmodelingprep.com/api/v3/historical-price-full/${currentStock.symbol}?${dateRange.current}&apikey=${apiKeyNames}`;
        let controller = new AbortController();
        (async () => {
          const response = await fetch(historyURL, {
            signal: controller.signal,
          });
          const priceHistory = await response.json();
          setStorePriceHistory(priceHistory.historical);
        })();
        return () => controller?.abort();
      } catch {
        console.log("Can't find searched stock");
      }
    }
  }, [currentStock]);

  useEffect(() => {
    // Search Filter
    (function filterNames() {
      try {
        setStockNames(
          storeData.filter((val) => {
            if (search === "") {
              return null;
            } else if (
              val.symbol.toLowerCase().includes(search.toLowerCase()) ||
              val.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            } else {
              return null;
            }
          })
        );
      } catch {
        console.log("did not connect to api");
      }
    })();
  }, [search]);

  useEffect(() => {
    // Websocket Connection == current Problem cannot update state while socket is on so need to turn socket off and back on
    if (!socket.current) {
      socket.current = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    }
    socket.current.onopen = () => {
      console.log("websocket open");

      socket.current.onmessage = (e) => {
        webSocketData.current = JSON.parse(e.data);
        console.log(stockList);
        // stock list {Tick:,Name:}
        // console.log(webSocketData.current);
        try {
          let wsData = webSocketData.current.data.map((val) => {
            return { lastPrice: val.p, Tick: val.s };
          });
          // console.log(wsData);
          let copyStockList = [...stockList];
          console.log("copy", copyStockList);
          filteredWS.current = copyStockList.map((val1)=>{
            return wsData.find((val2) => {
              // if (val2.Tick === val1.Tick) {
              //   // return {Tick:val2.Tick, lastPrice:val2.lastPrice};
              // }
            }
            );
          })
          console.log(filteredWS.current);
        } catch {
          console.log("Websocket not working");
        }
      };

      // Resubscribe to stocklist
      stockList.map((stock) => {
        return socket.current.send(
          JSON.stringify({ type: "subscribe", symbol: `${stock}` })
        );
      });
    };

    socket.current.onclose = () => {
      console.log("web close");
    };
    
  }, [stockList]);
  // useEffect(()=>{
  //   socket.current.close();
  // },[stockList])

  return (
    <List.Provider
      value={{
        stockPrice,
        setStockPrice,
        stockNames,
        setStockNames,
        currentStock,
        setCurrentStock,
        stockList,
        setStockList,
        storePriceHistory,
        audio,
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
        socket,
        webSocketData,
      }}
    >
      <section className="bodyContainer">
        <Search></Search>
        <CurrentTick></CurrentTick>
        <Data></Data>
      </section>
    </List.Provider>
  );
};

export default Index;
