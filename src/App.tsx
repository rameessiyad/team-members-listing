import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
