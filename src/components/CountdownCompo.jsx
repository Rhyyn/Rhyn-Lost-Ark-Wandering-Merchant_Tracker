import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CountdownCompo = (props) => {
  const data = props.wantedMerchant.spawntimer.times; //Spawn Times
  const [showSpawnTable, setShowSpawntable] = useState(false);
  const hoursArray = [];
  const minutesArray = [];
  const currentHour = new Date().getHours();

  // Convert Merchant hour spawn from AM to PM if currentHour is between 12 and 23 then Push to new hoursArray
  data &&
    data.map((item, index) => {
      if (currentHour >= 12) {
        hoursArray.push(parseInt(item.hour) + 12);
        minutesArray.push(item.minute);
      } else {
        hoursArray.push(item.hour);
        minutesArray.push(item.minute);
      }
    });

  // // Find hour that is the closest to currentHour clockwise
  const hourFound = hoursArray.find(function (element) {
    return element > currentHour;
  });

  // Previous way of finding closest hour but not clockwise
  // const output = hoursArray.reduce((prev, curr) =>
  //   Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev
  // );

  return (
    <div className="merchantCard">
      <p>{props.wantedMerchant.name}</p>
      <p>Name: {props.wantedMerchant.name}</p>
      <p>Location: {props.wantedMerchant.location}</p>
      <CountdownTimer hour={hourFound}></CountdownTimer>
      <button
        className={props.wantedMerchant.name}
        onClick={() => setShowSpawntable(!showSpawnTable)}
      >
        Show SpawnTable for this Merchant
      </button>
      {showSpawnTable
        ? data.map((item, index) => {
            return (
              <p key={index}>
                {item.hour}:{item.minute}
              </p>
            );
          })
        : null}
    </div>
  );
};

export default CountdownCompo;
