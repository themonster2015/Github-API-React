import React from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Search from "./components/Search";
import UserDisplay from "./components/UserDisplay";
import { Provider, Consumer } from "./context";
function App() {
  return (
    <Provider>
      <Consumer>
        {value => {
          return (
            <div className="App">
              <Navbar />
              <Search />
              <UserDisplay />
            </div>
          );
        }}
      </Consumer>
    </Provider>
  );
}

export default App;
