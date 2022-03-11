import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  const [hourSpawn, setHourSpawn] = useState("");
  const [minuteSpawn, setMinuteSpawn] = useState("");
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [currentTime, setCurrentTime] = useState();
  const goal = new Date().setHours(hourSpawn, minuteSpawn, 0);
  const remaining = goal - currentTime;

  // CALCULATE REMAINING TIME FROM MS
  useEffect(() => {
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
  }, [remaining]); // Adding your state as the dependency should allow it run every time the state changes

  // UPDATE CURRENT TIME EVERY SECOND
  const interval = setInterval(() => {
    if (goal > new Date()) {
      setCurrentTime(Date.now());
    } else {
      clearInterval(interval);
    }
  }, 1000);

  return <div></div>;
};

export default CountdownTimer;
