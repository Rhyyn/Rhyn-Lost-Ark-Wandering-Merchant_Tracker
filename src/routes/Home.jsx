import React from "react";
import Header from "../components/Header";
import Daily from "../components/Daily";
import { Link } from "react-router-dom";



const Home = () => {


  return (
    <header>
      <div className="homeContainer">
        <Header />
        <div className="bodyPage">
          <h1>Hello this is Home Page</h1>
          <Link to="/todo">ToDo</Link>
          <Link to="/merchant">Merchant Timer</Link>
        </div>
      </div>
    </header>
  );
};

export default Home;
