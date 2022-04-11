import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import CarouselCompo from "./CarouselCompo";

const CountdownCompo = (props) => {
  const data = props.wantedMerchant.spawntimer.times; //Spawn Times
  const [showSpawnTable, setShowSpawntable] = useState(false); // State used to show the spawntable of Selected Merchant
  const currentHour = new Date().getHours(); // current hour
  const currentTime = new Date().getTime(); // current Time in Milliseconds
  const allSpawnTimes = []; // array of all available spawntime of Selected Merchant
  const [hasTimerEnded, setHasTimerEnded] = useState(false); // Used to know whether or not current Timer has ended
  const [merchantSpawnTimer, setMerchantSpawnTimer] = useState(); // State of 25 Minutes uptime when Selected Merchant has spawned


  // TIME STUFFS
  // push all spawn times as MS date and convert to 24h Format
  if (props.wantedMerchant.name === "DEMO MERCHANT") { // USED FOR DEMO
    props.demoTime.map((item, index) => {              // USED FOR DEMO
      allSpawnTimes.push(item)                         // USED FOR DEMO
    })                                                 // USED FOR DEMO
  } else {
    data &&
    data.map((item) => {
      if (currentHour >= 12) {
        allSpawnTimes.push(
          new Date().setHours(parseInt(item.hour) + 12, item.minute, 0)
        );
      } else {
        allSpawnTimes.push(new Date().setHours(item.hour, item.minute, 0));
      }
      return null;
    });
  }

  //find closest spawn Time of selected Merchant from currentTime
  let closestTime = allSpawnTimes.find(function (element) {
    return element > currentTime;
  });

  // Start Timer of 25 minutes after Merchant has Spawned then after 25 minutes start Tracking next Spawn
  const switchTimers = () => {
    setMerchantSpawnTimer(closestTime + 1500000); // 1500000 ms = 25mins
    setTimeout(() => setHasTimerEnded(false), 1500000);
  };

  // onClick target card element and hide the card
  const onClick = (e) => {
    e.target.parentElement.parentElement.id = "hidden";
  };

  // MODAL LOGICS
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function playSoundMerchantSpawned() {
    let msg = new SpeechSynthesisUtterance("Merchant has spawned!");
    msg.volume = 0.5;
    window.speechSynthesis.speak(msg);
  }

  return (
    <div className="merchantCard" id={props.id}>
      <h4>{props.wantedMerchant.name}</h4>
      <h5>{props.wantedMerchant.location}</h5>
      {hasTimerEnded ? null : (
        <CountdownTimer
          goal={closestTime}
          setHasTimerEnded={setHasTimerEnded}
          switchTimers={switchTimers}
          timerName={"willSpawn"}
          playSoundMerchantSpawned={playSoundMerchantSpawned}
          is5MinSwitchOn={props.is5MinSwitchOn} // pass state of Switch Reminders buttons to timer
          is10MinSwitchOn={props.is10MinSwitchOn} // pass state of Switch Reminders buttons to timer
        ></CountdownTimer>
      )}
      {hasTimerEnded ? (
        <div>
          <p>Merchant has spawned !</p>
          <p>Time Left :</p>
          {merchantSpawnTimer && (
            <CountdownTimer
              goal={merchantSpawnTimer}
              setHasTimerEnded={setHasTimerEnded}
              timerName={"hasSpawned"}
            ></CountdownTimer>
          )}
        </div>
      ) : null}
      {hasTimerEnded ? null : (
        <Button
          className="spawnTableButton"
          onClick={() => setShowSpawntable(!showSpawnTable)}
        >
          Show Spawning Hours AM/PM
        </Button>
      )}

      <Modal centered show={modalShow} onHide={handleModalClose}>
        <Modal.Title>
          <h3 className="continentModalTitle">
            {props.wantedMerchant.location}
          </h3>
        </Modal.Title>
        <Modal.Body>
          <CarouselCompo item={props.wantedMerchant}></CarouselCompo>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
      {hasTimerEnded ? (
        <Button
          variant="warning"
          className="trackNextSpawnButton"
          onClick={() => setHasTimerEnded(false)}
        >
          Track Next Spawn
        </Button>
      ) : null}
      <div className="cardButtonGroup">
        {hasTimerEnded ? (
          <Button className="showSpawnButton" onClick={handleModalShow}>
            Show Spawn Locations
          </Button>
        ) : null}
        <Button
          className="deleteButton"
          variant="danger"
          onClick={(e) => onClick(e)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CountdownCompo;
