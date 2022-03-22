import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  const [currentTime, setCurrentTime] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const goal = props.goal;




// CALCULATE REMAINING TIME FROM MS
  const remaining = goal - currentTime;
  useEffect(() => {
    if (remaining > 1000) {
      let sec = Math.floor(remaining / 1000);
      let hrs = Math.floor(sec / 3600);
      setHours(hrs + "h");
      sec -= hrs * 3600;
      let min = Math.floor(sec / 60);
      min = "" + min;
      if (min < 10) {
        setMinutes("0" + min + "m")
      } else {
        setMinutes(min + "m")
      }
      sec -= min * 60;
      sec = "" + sec;
      sec = ("00" + sec).substring(sec.length);
      setSeconds(sec + "s");

      if (hrs > 0) {
        min = "" + min;
        min = ("00" + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
      } else {
        return min + ":" + sec;
      }
    } else if (remaining < 999) {
      props.setHasTimerEnded(true);
    }
  }, [remaining, props]);// Adding state as the dependency allows it run every time the state changes








  // const [hours, setHours] = useState();
  // const [minutes, setMinutes] = useState();
  // const [seconds, setSeconds] = useState();
  // const [currentTime, setCurrentTime] = useState(new Date().getTime());
  // const [visible, setVisible] = useState(false);
  // const [hidden, setHidden] = useState();

  // const closestTime = props.allSpawnTimes.find(function (element) {
  //   return element > currentTime;
  // });


  

 

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
    <p>{hours} : {minutes} : {seconds}</p>
    </div>
  );
};

export default CountdownTimer;
