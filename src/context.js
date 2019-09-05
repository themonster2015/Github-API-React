import React from "react";
import axios from "axios";

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_USER":
      return {
        ...state,
        info: action.payload,
        username: action.payload.login
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        info: null
      };
    default:
      return state;
  }
};
export class Provider extends React.Component {
  state = {
    username: "",
    info: null,
    loading: false,
    error: "",
    dispatch: action => this.setState(state => reducer(state, action))
  };
  componentDidMount() {
    axios
      .get(`https://api.github.com/users/themonster2015`, {
        headers: {
          "content-type": "application/vnd.github.mercy-preview+json"
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState(state =>
          reducer(state, { type: "SEARCH_USER", payload: res.data })
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
