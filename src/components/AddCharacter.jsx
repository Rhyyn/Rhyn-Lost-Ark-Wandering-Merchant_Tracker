import React from "react";
import { Button } from "@mui/material";
import CharacterCreation from "./CharacterCreation";
import { useState } from "react";
import { TextField, Paper } from "@mui/material";
import { styled } from "@mui/styles";

const AddCharacter = () => {
  const [show, setShow] = useState(false);

  const CustomTextField = styled(TextField)({  // styling of Textfield
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white'
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        border: '2px solid'
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '&.MuiInputBase-root' : {
          color: 'white'
      },
    //   '&.MuiInputBase-input': {
    //       color: 'white'
    //   }
    },
  });

  const CustomPaperStyle = styled(Paper)({ // Styling of Paper
      '&.MuiPaper-root': {
          backgroundColor: '#211857',
          marginTop: '1rem'
      },
  })


  return (
    <div className="newCharContainer">
      <Button
        className="AddCharButton"
        variant="contained"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Add Character"}
      </Button>
      {show && (
        <CustomPaperStyle elevation={2} className="newCharSettings" >
          <form className="characterForm">
            <CustomTextField label="Character Name" id="custom-css-outlined-input" />
          </form>
        </CustomPaperStyle>
      )}
    </div>
  );
};

export default AddCharacter;
