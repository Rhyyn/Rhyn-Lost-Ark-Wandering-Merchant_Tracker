import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CountdownCompo = (props) => {
  const data = props.wantedMerchant.spawntimer.times; //Spawn Times
  const [showSpawnTable, setShowSpawntable] = useState(false);
  const hoursArray = [];
  const minutesArray = [];
  const currentHour = new Date().getHours();
  const currentTime = new Date().getTime();
  const allSpawnTimes = [];

  // push all spawn times as MS date and convert to 24h Format
  data &&
    data.map((item) => {
      if (currentHour >= 12) {
        allSpawnTimes.push(
          new Date().setHours(parseInt(item.hour) + 12, item.minute, 0)
        );
      } else {
        allSpawnTimes.push(new Date().setHours(item.hour, item.minute, 0));
      }
    });

  //find closest spawn Time from currentTime
  const closestTime = allSpawnTimes.find(function (element) {
    // console.log("goal is : " + element);
    // console.log("currentTime is : " + currentTime);
    return element > currentTime;
  });

  return (
    <div className="merchantCard">
      <p>{props.wantedMerchant.name}</p>
      <p>Name: {props.wantedMerchant.name}</p>
      <p>Location: {props.wantedMerchant.location}</p>
      <CountdownTimer closestTime={closestTime}></CountdownTimer>
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
