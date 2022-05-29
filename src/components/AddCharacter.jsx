import React from "react";
import CharacterCreation from "./CharacterCreation";
import { useState } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import "bootstrap/dist/css/bootstrap.css";

const AddCharacter = () => {
    const [show, setShow] = useState(false);
    const [loaClass, setLoaClass] = React.useState("");

    let rdyClasses = [
        {
            Warrior: ["Berserker", "Paladin", "Gunlancer"],
        },
        {
            Martial: ["Striker", "Wardancer", "Scrapper", "Soulfist"],
        },
        {
            Gunner: ["Gunslinger", "Artillerist", "Deadeye", "Sharpshooter"],
        },
        {
            Mage: ["Bard", "Sorceress"],
        },
        {
            Assassin: ["Shadowhunter", "Deathblade"],
        },
    ];

    const handleChange = (event) => {
        setLoaClass(event.target.value);
    };

    return (
        <div className="newCharContainer">
            <button
                value="AddChar"
                className="AddCharButton"
                onClick={() => setShow(!show)}
            >
                {show ? "Hide" : "Add Character"}
            </button>

            {show && (
                <form className="characterForm">
                    <label>
                        <input type="text" value="Character Name"></input>
                    </label>
                    <DropdownButton
                        variant="primary"
                        id="dropdown-basic-button"
                        title="Add Class"
                        autoClose="true"
                        className="test"
                    >
                        <p className="DropdownDivider">Warrior</p>
                        {rdyClasses.forEach((item) => {
                            for (let key in item) {
                                if (key === "Warrior") {
                                    item.Warrior.forEach((item) => {
                                        return <p>{item}</p>;
                                    });
                                }
                            }
                        })}

                        <p className="DropdownDivider">Martial Artists</p>
                        <p className="DropdownDivider">Gunner</p>
                        <p className="DropdownDivider">Mage</p>
                        <p className="DropdownDivider">Assassin</p>
                    </DropdownButton>
                </form>
            )}
        </div>
    );
};

export default AddCharacter;

// {warriorClasses.map((item) => {
//   return (
//     <Dropdown.Item key={item} value={item}>
//       {item}
//     </Dropdown.Item>
//   );
// })}
