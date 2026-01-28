import React from "react";
import TeamTable from "./components/TeamTable/TeamTable";
import "./App.css";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="app">
      {/* <h1 className="app__title">Team Members</h1> */}
      <Header />
      <TeamTable />
    </div>
  );
};

export default App;
