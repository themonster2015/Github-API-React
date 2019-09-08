import React from "react";
import "./UserDisplay.css";
import { Consumer } from "../context";
import Moment from "react-moment";
import InfiniteScroller from "./InfiniteScroller";
class UserDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      display_data: false
    };
  }

  getURL = (event, data, dispatch) => {
    this.setState({
      display_data: false
    });
    setTimeout(() => {
      this.setState({
        data: data,
        display_data: true
      });
      dispatch({
        type: "SET_URL",
        payload: this.state.data
      });
    }, 500);
  };

  render() {
    return (
      <Consumer>
        {value => {
          let user_data = "";
          if (value.url && this.state.display_data) {
            user_data = <InfiniteScroller data={this.state.data} />;
          }

          if (value.info !== null) {
            return (
              <div className="user-profile ">
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
                        onClick={event =>
                          this.getURL(
                            event,
                            `${value.info.url}/following`,
                            value.dispatch
                          )
                        }
                      >
                        <b>{value.info.following}</b>
                        <p>Following</p>
                      </li>
                      <li
                        className="user-followers"
                        onClick={event =>
                          this.getURL(
                            event,
                            `${value.info.url}/followers`,
                            value.dispatch
                          )
                        }
                      >
                        <b>{value.info.followers}</b>
                        <p>Followers</p>
                      </li>
                      <li
                        className="user-repos"
                        onClick={event =>
                          this.getURL(
                            event,
                            `${value.info.url}/repos`,
                            value.dispatch
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
