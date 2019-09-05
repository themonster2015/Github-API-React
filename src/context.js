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
      .get(`http://api.github.com/repos/themonster2015/2015lab1/topics`, {
        headers: {
          "content-type": "application/vnd.github.mercy-preview+json"
        }
      })
      .then(res => {
        console.log(res.data);
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
