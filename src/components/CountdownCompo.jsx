import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CountdownCompo = (props) => {
  const data = props.merchantSchedule.times; // Spawn Times
  const [showCountDown, setShowCountDown] = useState(false);
  const hoursArray = [];
  const minutesArray = [];
  const currentHour = new Date().getHours();


  // Convert Merchant hour spawn from AM to PM if currentHour is between 12 and 23 then Push to new hoursArray
  data.map((item, index) => {
    if (currentHour >= 12) {
      hoursArray.push(parseInt(item.hour) + 12);
      minutesArray.push(item.minute)
    } else {
      hoursArray.push(item.hour);
      minutesArray.push(item.minute)
    }
  });

  // Find hour that is the closest to currentHour clockwise
  const hourFound = hoursArray.find(function(element) {return element > currentHour});  

  // Previous way of finding closest hour but not clockwise
  // const output = hoursArray.reduce((prev, curr) =>
  //   Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev
  // );


  return (
    <div className="merchantCard">
      <p>Name: {props.merchantName}</p>
      <p>Location: {props.merchantLocation}</p>
      <button
        id={props.merchantName}
        onClick={() => setShowCountDown(!showCountDown)}
      >
        Track this Merchant
      </button>
      {showCountDown ? <CountdownTimer hour={hourFound}></CountdownTimer> : null}
      {data &&
        data.map((item, index) => {
          return (
            <li key={index}>
              {item.hour}:{item.minute}
            </li>
          );
        })}
    </div>
  );
};

export default CountdownCompo;

