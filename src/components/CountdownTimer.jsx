import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState();

  const closestTime = props.allSpawnTimes.find(function (element) {
    return element > currentTime;
  });


  // CALCULATE REMAINING TIME FROM MS
  const goal = closestTime;
  const remaining = goal - currentTime;
  useEffect(() => {
    if (remaining > 1000) {
      let sec = Math.floor(remaining / 1000);
      let hrs = Math.floor(sec / 3600);
      setHours(hrs);
      sec -= hrs * 3600;
      let min = Math.floor(sec / 60);
      setMinutes(min);
      sec -= min * 60;

      sec = "" + sec;
      sec = ("00" + sec).substring(sec.length);
      setSeconds(sec);

      if (hrs > 0) {
        min = "" + min;
        min = ("00" + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
      } else {
        return min + ":" + sec;
      }
    } else {
      setVisible(true);
      setHidden("hidden");
    }
  }, [remaining]); // Adding your state as the dependency
  // should allow it run every time the state changes

 

  // UPDATE CURRENT TIME EVERY SECOND
  const interval = setInterval(() => {
    if (goal > new Date()) {
      setCurrentTime(new Date().getTime());
    } else {
      clearInterval(interval);
    }
  }, 1000);

  return (
    <div>
      <p id={hidden}>
        Time Remaing before spawn : {hours}hrs and {minutes}mn and {seconds}s
      </p>
      {visible ? <p>Wandering Merchant has spawned !</p> : null}
    </div>
  );
};

export default CountdownTimer;
