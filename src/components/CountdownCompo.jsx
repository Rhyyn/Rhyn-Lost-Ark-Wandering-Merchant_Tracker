import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CountdownCompo = (props) => {
  let data = props.merchantSchedule.times;

  return (
    <div className="merchantCard">
      <p>Name: {props.merchantName}</p>
      <p>Location: {props.merchantLocation}</p>
      <button>Track this Merchant</button>
      {data &&
        data.map((item, index) => {
          return (<ul>
            <li>{item.hour}:{item.minute}</li>
          </ul>)
        })}
    </div>
  );
};

export default CountdownCompo;
