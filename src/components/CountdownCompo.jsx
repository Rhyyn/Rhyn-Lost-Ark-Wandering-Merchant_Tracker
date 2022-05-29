import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import CarouselCompo from "./CarouselCompo";
import moment from "moment";

const CountdownCompo = (props) => {
    const data = props.wantedMerchant.spawntimer.times; //Spawn Times
    const [showSpawnTable, setShowSpawntable] = useState(false); // State used to show the spawntable of Selected Merchant
    const allSpawnTimes = []; // array of all available spawntime of Selected Merchant
    const [hasTimerEnded, setHasTimerEnded] = useState(false); // Used to know whether or not current Timer has ended
    const [merchantSpawnTimer, setMerchantSpawnTimer] = useState(); // State of 25 Minutes uptime when Selected Merchant has spawned
    let userServer = props.userServer;
    let serverDate = "";
    let updatedDate = serverDate;
    let serverDateAsMs = "";
    let userClientTime = moment().valueOf();

    //MOMENT
    // let testDateOffset = (moment.utc() - 25200000);
    let dateAsMs = moment.utc().unix() * 1000; // UTC time in MS - offset as SUBSTRACTION
    // let dateAsDate = moment.utc(dateAsMs).format();        UTC time as Date string format  - offset as .utcOffset(-7)
    // moment.utc(dateAsMs).set('hour', 6).format();      // can set Hour/Minute etc..

    // TIME STUFFS
    // set date based on user Server
    if (userServer === "US West") {
        serverDate = moment.utc(dateAsMs).utcOffset(-7);
        updatedDate = serverDate;
        serverDateAsMs = moment.utc().unix() * 1000 - 25200000;
    } else if (userServer === "US East") {
        serverDate = moment.utc(dateAsMs).utcOffset(-4);
        updatedDate = serverDate;
        serverDateAsMs = moment.utc().unix() * 1000 - 14400000;
    } else if (userServer === "EU West") {
        serverDate = moment.utc(dateAsMs);
        updatedDate = serverDate;
        serverDateAsMs = moment.utc().unix() * 1000;
    } else if (userServer === "EU Central") {
        serverDate = moment.utc(dateAsMs).utcOffset(1);
        updatedDate = serverDate;
        serverDateAsMs = moment.utc().unix() * 1000 + 3600000;
    } else if (userServer === "South America") {
        serverDate = moment.utc(dateAsMs).utcOffset(-3);
        updatedDate = serverDate;
        serverDateAsMs = moment.utc().unix() * 1000 - 10800000;
    }

    let currentHour = serverDate.hour(); // current hour

    // push all spawn times as MS date and convert to 24h Format
    if (props.wantedMerchant.name === "DEMO MERCHANT") {
        let demoTime = [
            serverDateAsMs + 10000,
            serverDateAsMs + 20000,
            serverDateAsMs + 40000,
            serverDateAsMs + 60000,
            serverDateAsMs + 80000,
            serverDateAsMs + 100000,
        ]; // USED FOR DEMO
        demoTime.map((time, index) => {
            allSpawnTimes.push(time);
        });
    } else {
        data &&
            data.map((item) => {
                if (currentHour >= 12) {
                    updatedDate = updatedDate.utc().set({
                        hour: parseInt(item.hour) + 12,
                        minute: item.minute,
                        second: 0,
                    });
                    allSpawnTimes.push(
                        // updatedDate.setHours(parseInt(item.hour) + 12, item.minute, 0)
                        updatedDate.unix() * 1000
                    );
                } else {
                    // newDate.setHours(item.hour, item.minute, 0);
                    updatedDate = updatedDate.utc().set({
                        hour: item.hour,
                        minute: item.minute,
                        second: 0,
                    });
                    allSpawnTimes.push(
                        // updatedDate.setHours(item.hour, item.minute, 0)
                        updatedDate.unix() * 1000
                    );
                }
                return null;
            });
    }

    //find closest spawn Time of selected Merchant from currentTime
    let closestTime = allSpawnTimes.find(function (element) {
        if (props.wantedMerchant.name === "DEMO MERCHANT") {
            return element > serverDateAsMs;
        } else {
            return element > serverDateAsMs;
        }
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
                    userServer={userServer}
                    goal={closestTime}
                    setHasTimerEnded={setHasTimerEnded}
                    switchTimers={switchTimers}
                    timerName={"willSpawn"}
                    playSoundMerchantSpawned={playSoundMerchantSpawned}
                    soundAlert={props.soundAlert}
                    is5MinSwitchOn={props.is5MinSwitchOn} // pass state of Switch Reminders buttons to timer
                    is10MinSwitchOn={props.is10MinSwitchOn} // pass state of Switch Reminders buttons to timer
                    merchantName={props.wantedMerchant.name}
                ></CountdownTimer>
            )}
            {hasTimerEnded ? (
                <div>
                    <p>Merchant has spawned !</p>
                    <p>Time Left :</p>
                    <CountdownTimer
                        soundAlert={props.soundAlert}
                        goal={merchantSpawnTimer}
                        setHasTimerEnded={setHasTimerEnded}
                        userServer={userServer}
                        timerName={"hasSpawned"}
                    ></CountdownTimer>
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
                    <Button
                        className="showSpawnButton"
                        onClick={handleModalShow}
                    >
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
