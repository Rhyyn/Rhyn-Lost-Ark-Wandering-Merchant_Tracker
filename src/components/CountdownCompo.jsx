import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CountdownCompo = (props) => {
  const data = props.wantedMerchant.spawntimer.times; //Spawn Times
  const [showSpawnTable, setShowSpawntable] = useState(false);
  const currentHour = new Date().getHours();
  const currentTime = new Date().getTime();
  const allSpawnTimes = [];
  const [hasTimerEnded, setHasTimerEnded] = useState();
  const [test, setTest] = useState(true);

  const [merchantSpawnTimer, setMerchantSpawnTimer] = useState();

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
      return null;
    });

  //find closest spawn Time from currentTime
  const closestTime = allSpawnTimes.find(function (element) {
    return element > currentTime;
  });

  if (test === true) {
    setMerchantSpawnTimer(closestTime + 1500000);
    setTest(false);
    setTimeout(() => setHasTimerEnded(false), 1500000);
  }
  // console.log(merchantSpawnTimer);

  const onClick = (e) => {
    // onClick used to hide the card
    e.target.parentElement.id = "hidden";
  };
  const [modalShow, setModalShow] = useState(false)
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  return (
    <div className="merchantCard" id={props.id}>
      <p>Name: {props.wantedMerchant.name}</p>
      <p>Location: {props.wantedMerchant.location}</p>
      {hasTimerEnded ? null : (
        <CountdownTimer
          goal={closestTime}
          setHasTimerEnded={setHasTimerEnded}
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
            ></CountdownTimer>
          )}
        </div>
      ) : null}
      {hasTimerEnded ? null : (
        <button
          className={props.wantedMerchant.name}
          onClick={() => setShowSpawntable(!showSpawnTable)}
        >
          Show SpawnTable for this Merchant
        </button>
      )}
      

      {hasTimerEnded ? <button onClick={handleModalShow}>Show Spawn Locations</button> : null}

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Spawn Locations for {props.wantedMerchant.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src="/images/Mac/traveling_merchant_mac_delphi_township.jpg"/></Modal.Body>
        <Modal.Footer>
          <button onClick={handleModalClose}>Close</button>
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

      <button onClick={(e) => onClick(e)}>Delete Me</button>
    </div>
  );
};

export default CountdownCompo;
