import React, { Component } from "react";
import { Consumer } from "../context";
import axios from "axios";

class Search extends Component {
  state = {
    username: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  findUser = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then(res => {
        dispatch({
          type: "SEARCH_USER",
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: "No User Found"
        });
      });
  };
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-5 text-center">
                <i className="fa fa-github" /> Enter a Github Username to Search
              </h1>
              <form onSubmit={this.findUser.bind(this, value.dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Github username..."
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get User's Info
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
