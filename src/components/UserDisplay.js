import React from "react";
import "./UserDisplay.css";
import { Consumer } from "../context";
import Details from "./Details";
import axios from "axios";
import Moment from "react-moment";
class UserDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      display_data: false
    };
    this.getUserData = this.getUserData.bind(this);
  }
  getUserData = (dispatch, e, data, type) => {
    setTimeout(() => {
      axios
        .get(`${data}`)
        .then(res => {
          dispatch({
            type: type,
            payload: res.data
          });
        })
        .then(res =>
          this.setState({
            display_data: true,
            data: type
          })
        )
        .catch(err => {
          console.log(err);
          dispatch({
            type: "ERROR",
            payload: "Error retrieving info."
          });
        });
    }, 500);
  };

  render() {
    let user_data = "";
    if (this.state.data && this.state.display_data) {
      user_data = <Details data={this.state.data} />;
    }
    return (
      <Consumer>
        {value => {
          this.getUserData.bind(this, value.dispatch);

          if (value.info !== null) {
            return (
              <div className="user-profile">
                <div className="user-profile-grid">
                  <div className="user-img">
                    <img
                      className="user-img"
                      src={"" + value.info.avatar_url}
                      alt=""
                    />
                  </div>
                  <div className="profile-user-settings">
                    <h1 className="user-name">{value.info.login}</h1>
                    <button className="btn-danger btn">
                      <a className="text-white" href={value.info.html_url}>
                        Visit Profile
                      </a>
                    </button>
                  </div>
                  <div className="user-bio">
                    <p className="user-bio">{value.info.bio}</p>
                  </div>
                  <div className="user-stats">
                    <ul>
                      <li
                        className="user-following"
                        onClick={e =>
                          this.getUserData(
                            value.dispatch,
                            e,
                            `${value.info.url}/following`,
                            "FOLLOWING"
                          )
                        }
                      >
                        <b>{value.info.following}</b>
                        <p>Following</p>
                      </li>
                      <li
                        className="user-followers"
                        onClick={e =>
                          this.getUserData(
                            value.dispatch,
                            e,
                            `${value.info.url}/followers`,
                            "FOLLOWERS"
                          )
                        }
                      >
                        <b>{value.info.followers}</b>
                        <p>Followers</p>
                      </li>
                      <li
                        className="user-repos"
                        onClick={e =>
                          this.getUserData(
                            value.dispatch,
                            e,
                            `${value.info.url}/repos`,
                            "REPOS"
                          )
                        }
                      >
                        <b>{value.info.public_repos}</b>
                        <p>Repos</p>
                      </li>
                      <li className="user-repos">
                        <b>Joined</b>
                        <p>
                          <Moment from={new Date()}>
                            {value.info.created_at}
                          </Moment>
                        </p>
                      </li>
                    </ul>
                  </div>

                  {user_data}
                </div>
              </div>
            );
          } else {
            if (value.error !== null) {
              return <p>{value.error}</p>;
            }
          }
        }}
      </Consumer>
    );
  }
}

export default UserDisplay;
