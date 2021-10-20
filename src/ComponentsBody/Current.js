import React, {useContext} from 'react';
import {List} from "./index";
import {Night} from "../App"
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";

const CurrentTick = () => {

    // Global states
    const { day } = useContext(Night);
    // Body states
    const {currentStock,setCurrentStock,stocks,setStocks} = useContext(List)
    
    const add = ()=>{
        setStocks([...currentStock.symbol]);
        setCurrentStock("");
        console.log(stocks)
    }
    const remove = ()=>{
        setCurrentStock("")
        }
    // console.log(stocks);

    if(currentStock){
    return (
      <div className="currentContainer">
        <div className="currentStockData" style={day?null:{ backgroundColor: "#343e4b"}}>
          <div className="sdataContainer">
            <h2 className="data">
              {currentStock.name} ({currentStock.symbol})
            </h2>
            <h2 className="data">Last Price : ${currentStock.price}</h2>
          </div>
          <div className="chartContainer">
            <h2>chart</h2>
          </div>
        </div>

        <div className="acceptStockContainer">
          <h3 className="caption">Add Stock to Watchlist</h3>
          <div className="acceptStock">
            <GoCheck className="checkButton" onClick={add} style={day?null:{border:"white",background:"white",color:"black"}}></GoCheck>
            <GoX className="xButton" onClick={remove} style={day?null:{border:"white",background:"white",color:"black"}}></GoX>
          </div>
        </div>
      </div>
    );}else{
      return(
        <div></div>
      )
    }
}

export default CurrentTick
