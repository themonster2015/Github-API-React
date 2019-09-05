import React from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
    </div>
  );
}

export default App;
