import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  const [currentTime, setCurrentTime] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const goal = props.goal;
  const [isPlaying, setIsPlaying] = useState(false); // State used to make Reminders TTS play only once

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
        setMinutes("0" + min + "m");
      } else {
        setMinutes(min + "m");
      }
      sec -= min * 60;
      sec = "" + sec;
      sec = ("00" + sec).substring(sec.length);
      setSeconds(sec + "s");
      if (hrs > 0) {
        // Add 0 in front of minutes if under 10
        min = "" + min;
        min = ("00" + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
      } else {
        return min + ":" + sec;
      }
    } else if (props.timerName === "willSpawn" && remaining < 999) {
      // check if currentTimer is for next Merchant Spawn and initiate timer switch for hasSpawned
      props.setHasTimerEnded(true);
      props.switchTimers();
      props.playSoundMerchantSpawned(); // play TTS Merchant has spawned when timer ends
    } else if (props.timerName === "hasSpawned" && remaining < 999) {
      // check if currenTimer is for Merchant uptime
      props.setHasTimerEnded(true);
    } else if (remaining < 999) {
      // else terminate
      props.setHasTimerEnded(true);
    }
  }, [remaining, props]); // Adding state as the dependency allows it run every time the state changes


  // Play Reminder sounds if either props.5MinSwitcOn === true || props.5minSwitchOn === true
  useEffect(() => {
    if (props.is5MinSwitchOn && !isPlaying && minutes === "05m" && seconds === "00s") {
      setIsPlaying(true); // used to stop this from running more than once
      let msg = new SpeechSynthesisUtterance("5 minutes before Merchant Spawn");
      msg.volume = 0.5;
      window.speechSynthesis.speak(msg);
    } else if (props.is10MinSwitchOn && !isPlaying && minutes === "10m" && seconds === "00s") {
      setIsPlaying(true); // used to stop this from running more than once
      let msg = new SpeechSynthesisUtterance("10 minutes before Merchant Spawn");
      msg.volume = 0.5;
      window.speechSynthesis.speak(msg);
    } else {
      return null;
    }
  });


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
      <p>
        {hours} : {minutes} : {seconds}
      </p>
    </div>
  );
};

export default CountdownTimer;
