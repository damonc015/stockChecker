import React, { useState, useEffect, useContext, createContext } from "react";
import Search from "./Search";
import Data from "./Data";
import CurrentTick from "./Current";
import { Night } from "../App";
import sound from "./Fishing-bell-sound-effect.mp3";

export const List = createContext();

const Index = () => {
  // Watchlist
  const [stocks, setStocks] = useState([]);
  // Filtered Search
  // Search
  const { search, stockNames, setStockNames } = useContext(Night);
  const stockList = ["NIO", "SPY"];
  // Preview Stock
  const [currentStock, setCurrentStock] = useState("");
  // WebSocket Api Key
  const apiKey = "c55l1nqad3icdhg1270g";
  // Stock Names Api Key
  const apiKeyNames = "365fdc617d44b4b70556e939fbbb42f3";
  const url = `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=${apiKeyNames}`;
  const [storeData, setStoreData] = useState([]);
  // Alarm Sound
  const audio = new Audio(sound);

  const filterNames = () => {
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
          }
        })
      );
    } catch {
      console.log("did not connect to api");
    }
  };

  function connect() {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    socket.onopen = () => {
      console.log("connected");
      stockList.map((stock) => {
        return socket.send(
          JSON.stringify({ type: "subscribe", symbol: `${stock}` })
        );
      });
    };

    socket.onmessage = (e) => {
      setStocks(JSON.parse(e.data));
    };

    socket.onclose = () => {
      console.log("disconnected");
    };
  }

  useEffect(() => {
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

  useEffect(() => {
    connect();
    filterNames();
  }, [search]);

  return (
    <List.Provider
      value={{
        stockNames,
        setStockNames,
        currentStock,
        setCurrentStock,
        stocks,
        setStocks,
        audio,
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
