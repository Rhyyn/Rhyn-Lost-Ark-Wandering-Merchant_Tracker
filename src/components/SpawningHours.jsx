import { React, useState } from "react";
import { Button } from "react-bootstrap";

const SpawningHours = (props) => {
    const [showSpawnTable, setShowSpawntable] = useState(false); // State used to show the spawntable of Selected Merchant
    return (
        <div>
            {props.hasTimerEnded ? null : (
                <Button
                    className="spawnTableButton"
                    onClick={() => setShowSpawntable(!showSpawnTable)}
                >
                    Show Spawning Hours AM/PM
                </Button>
            )}
            <ul>
                {showSpawnTable
                    ? !props.hasTimerEnded
                        ? props.data.map((item, index) => {
                              return (
                                  <li className="spawnTableList" key={index}>
                                      {item.hour}:{item.minute}
                                  </li>
                              );
                          })
                        : null
                    : null}
            </ul>
        </div>
    );
};

export default SpawningHours;
