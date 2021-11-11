import React, { useState, useEffect } from "react";
import { WiTime12 } from "react-icons/wi";

const Time = () => {
  const [time, setTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(0);
  const [rTime, setRTime] = useState(false);
  const [open, setOpen] = useState(true);

  const hourLeft = Math.floor(timeLeft / 3600);
  const minuteLeft = Math.floor((timeLeft - hourLeft * 3600) / 60);
  const secondLeft = Math.floor(timeLeft - (hourLeft * 3600 + minuteLeft * 60));

  const closeTime = 57600;
  const openTime = 34200;

  useEffect(() => {
    var timer = setInterval(() => {
      setTime(new Date());
      
      // 4pm-9:30am
      if (time.getHours() * 60 + time.getMinutes() >= 960) {
        setTimeLeft(
          (59 - time.getMinutes()) * 60 +
            (23 - time.getHours()) * 3600 +
            (60 - time.getSeconds()) +
            34200 -
            1
        );
        setOpen(false);
      }
      // 12am-9:30am
      if (time.getHours() * 60 + time.getMinutes() < 570) {
        setTimeLeft(
          openTime -
            (time.getHours() * 3600 +
              time.getMinutes() * 60 +
              time.getSeconds()) -
            1
        );
        setOpen(false);
      }
      // 9:30am - 4pm
      if (
        time.getHours() * 60 + time.getMinutes() >= 570 &&
        time.getHours() * 60 + time.getMinutes() < 960
      ) {
        setTimeLeft(
          closeTime -
            (time.getHours() * 3600 +
              time.getMinutes() * 60 +
              time.getSeconds()) -
            1
        );
        setOpen(true);
      }
    }, 1000);
    return function clearTime() {
      clearInterval(timer);
    };
  }, [time]);

  if (rTime) {
    return (
      <div className="clock">
        <div>
          <h1>
            {time.toLocaleTimeString("en-US", {
              timeZone: "America/New_York",
            })}{" "}
            EST
          </h1>
          <WiTime12
            className="clockIcon"
            onClick={() => {
              setRTime(!rTime);
            }}
          ></WiTime12>
        </div>
        <div className={open ? "countdownGreen" : "countdownRed"}>
          <h3>{`${hourLeft < 10 ? "0" + hourLeft : hourLeft}:${
            minuteLeft < 10 ? "0" + minuteLeft : minuteLeft
          }:${secondLeft < 10 ? "0" + secondLeft : secondLeft}`}</h3>
        </div>
        <div className={open ? "countdownWOpen" : "countdownWClose"}>
          {open ? "until market closes" : "until market opens"}
        </div>
      </div>
    );
  } else {
    return (
      <div className="clock">
        <div>
          <h1>
            {time.toLocaleTimeString("en-US", {
              timeZone: "America/New_York",
            })}{" "}
            EST
          </h1>
          <WiTime12
            className="clockIcon"
            onClick={() => {
              setRTime(!rTime);
            }}
          ></WiTime12>
        </div>
      </div>
    );
  }
};

export default Time;
