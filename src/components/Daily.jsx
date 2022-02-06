import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Daily = () => {
  return (
    <div className="checkBoxContainer">
      <h3 className="formLabel">Dailies</h3>
      <FormControl>
        <FormGroup className="test">
          <FormControlLabel
            value="una's dailies"
            control={<Checkbox />}
            label="Una's Dailies"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
          <FormControlLabel
            value="chaos dungeon"
            control={<Checkbox />}
            label="Chaos Dungeon x2"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
          <FormControlLabel
            value="guardian raid"
            control={<Checkbox />}
            label="Guardian Raid"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
          <FormControlLabel
            value="chaos gate"
            control={<Checkbox />}
            label="Chaos Gate"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
          <FormControlLabel
            value="Una's Dailies"
            control={<Checkbox />}
            label="Una's Dailies"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
          <FormControlLabel
            value="Una's Dailies"
            control={<Checkbox />}
            label="Una's Dailies"
            labelPlacement="start"
            style={{justifyContent: "space-between"}}
          ></FormControlLabel>
        </FormGroup>
      </FormControl>
    </div>
  );
};


export default Daily;
