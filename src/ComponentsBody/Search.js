import React, {useState, useEffect,useContext} from 'react';
import { Night } from "../App";
import {List} from "./index";
import {AiFillBell} from "react-icons/ai";

const Search = () => {

  const {search,setSearch,day}= useContext(Night);
  const {stockNames,setStockNames,setCurrentStock,audio} = useContext(List);
  const [ring,setRing] = useState(false);

  const handleSearch = e =>{
    setSearch(e.target.value);
  }

  const defaultSelect = (e)=>{
    e.preventDefault();
    setStockNames([]);
    setCurrentStock(stockNames[0]);
    setSearch("");
  }

  const selectStock = (selectedStock)=>{
    setCurrentStock(selectedStock);
    setStockNames([]);
    setSearch("");
  }

  const addRing = ()=>{
    setRing(true);
    audio.play();
  }

  useEffect(()=>{
    let ringTimer = setTimeout(()=>setRing(false),3000);
    return()=>{
      clearTimeout(ringTimer);
    }
  },[ring])

    return (
      <div className="searchContainer" style={day?null:{ backgroundColor: "#141e28"}}>
        <h1>Stock Alerter <AiFillBell className={ring?"bellring":"bell"} onClick={addRing}></AiFillBell></h1>
        <form className="searchBar" onSubmit={defaultSelect}>
          <input
            className="search"
            type="text"
            value={search}
            placeholder="Search stock symbol/name"
            onChange={handleSearch}
            required
          />
        </form>
        <div className="searchResults">
          <ul>
            {stockNames.slice(0, 8).map((stockname) => {
              const { name, symbol } = stockname;
              return (
                <li
                  className="displaySearch"
                  onClick={() => selectStock(stockname)}
                  key={symbol}
                >
                  <p>
                    {name} ({symbol})
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
}

export default Search
