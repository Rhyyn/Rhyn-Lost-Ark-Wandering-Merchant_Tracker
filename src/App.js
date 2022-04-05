import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Merchant from "./routes/Merchant";
import Todo from "./routes/ToDo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Merchant />}></Route>
          <Route path="/merchant" element={<Merchant />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
