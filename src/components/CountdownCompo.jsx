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

  // for (let index = 0; index < data.length; index++) {
  //   const element = data[index];
  //   console.log(element.hour + ":" + element.minute);
  // }

  //find closest spawn Time from currentTime

  const onClick = (e) => {
    e.target.parentElement.id = "hidden";
  };

  return (
    <div className="merchantCard" id={props.id}>
      <p>Name: {props.wantedMerchant.name}</p>
      <p>Location: {props.wantedMerchant.location}</p>
      <CountdownTimer allSpawnTimes={allSpawnTimes} name={props.wantedMerchant.name}></CountdownTimer>
      <button
        className={props.wantedMerchant.name}
        onClick={() => setShowSpawntable(!showSpawnTable)}
      >
        Show SpawnTable for this Merchant
      </button>
      <ul>
        
        {showSpawnTable
          ? data.map((item, index) => {
              return (
                <li className="spawnTableList" key={index}>
                  {item.hour}:{item.minute}
                </li>
              );
            })
          : null}
      </ul>

      <button onClick={(e) => onClick(e)}>Delete Me</button>
    </div>
  );
};

export default CountdownCompo;
