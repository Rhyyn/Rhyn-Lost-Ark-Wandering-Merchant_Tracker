import React from "react";
import Header from "../components/Header";
import Daily from "../components/Daily";
import AddCharacter from "../components/AddCharacter";
import Grid from "@mui/material/Grid";

const Home = () => {
  return (
    <header>
      <div className="homeContainer">
        <Header />
        <div className="bodyPage">
          <AddCharacter />
          <Grid container
                justifyContent="center" >
            <Grid item md={2} xs={12} sm={6}>
              <Daily />
            </Grid>
            <Grid item md={2} xs={12} sm={6}>
              <Daily />
            </Grid>
            <Grid item md={2} xs={12} sm={6}>
              <Daily />
            </Grid>
            <Grid item md={2} xs={12} sm={6}>
              <Daily />
            </Grid>
          </Grid>
        </div>
      </div>
    </header>
  );
};

export default Home;
