import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import Search from "./Search";
import Data from "./Data";
import CurrentTick from "./Current";
import { Night } from "../App";
import sound from "./Fishing-bell-sound-effect.mp3";

export const List = createContext();

const Index = () => {
  // Watchlist
  const [stocks, setStocks] = useState([]);
  // Symbols to be parsed by websocket
  const [stockList, setStockList] = useState([]);
  const { search, stockNames, setStockNames } = useContext(Night);
  // Preview Stock
  const [currentStock, setCurrentStock] = useState("");
  // WebSocket Api Key
  const apiKey = "c55l1nqad3icdhg1270g";
  // Stock Names Api Key
  const apiKeyNames = "365fdc617d44b4b70556e939fbbb42f3";
  //Fetched Stock List and Current Stock
  const [storeData, setStoreData] = useState([]);
  const [storePriceHistory, setStorePriceHistory] = useState("");
  const [storePriceAllHistory, setStorePriceAllHistory] = useState([]);
  // Alarm Sound
  const audio = new Audio(sound);
  const dateRange = useRef(0);

  // console.log(storePriceHistory);
  // console.log(storePriceAllHistory);

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

  // Connect to Stock List
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
    const historyURL = `https://financialmodelingprep.com/api/v3/historical-price-full/${currentStock.symbol}?${dateRange.current}&apikey=${apiKeyNames}`;
    if (currentStock) {
      try {
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

  // if (stocks){
  //   try{
  //     console.log(stocks)
  //   // console.log(stocks[0].data[0].p.toFixed(2))
  //   }catch{
  //     console.log("hi")
  //   }
  // }

  // useEffect(()=>{
  //     // Websocket Connection
  //     const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
  //     if (stockList.length > 0){
  //       socket.onopen = () => {
  //         console.log("Websocket connected");
  //             // socket.send(
  //             //   JSON.stringify({ type: "subscribe", symbol: "AAPL" })
  //             // );
  //             // socket.send(
  //             //   JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
  //             // );
  //         // stockList.map((stock) => {
  //         //   return socket.send(
  //         //     JSON.stringify({ type: "subscribe", symbol: `${stock}` })
  //         //   );
  //         // });
  //       };
  //       socket.onmessage = (e) => {
  //         setStocks([...stocks,JSON.parse(e.data)]);
  //         stockList.map((stock) => {
  //           return socket.send(
  //             JSON.stringify({type: "unsubscribe",symbol: `${stock}`,})
  //           );
  //         });
  //       };
  //       socket.onclose = () => {
  //         console.log("Websocket disconnected");
  //       };
  //     }
  // },[stockList])

  return (
    <List.Provider
      value={{
        stocks,
        stockNames,
        setStockNames,
        currentStock,
        setCurrentStock,
        stockList,
        setStockList,
        storePriceHistory,
        audio,
        storePriceAllHistory,
        setStorePriceAllHistory
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
