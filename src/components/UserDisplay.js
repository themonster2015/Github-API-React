import React from "react";
import "./UserDisplay.css";
import { Consumer } from "../context";
import Loading from "./Loading";
class UserDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      display_data: false
    };
  }
  getUserData = (event, data) => {
    this.setState({
      display_data: false
    });
    setTimeout(() => {
      this.setState({
        data: data,
        display_data: true
      });
    }, 500);
  };

  render() {
    // let user_data = "";
    // if (this.state.data && this.state.display_data) {
    //   user_data = <UserData data={this.state.data} />;
    // }

    return (
      <Consumer>
        {value => {
          console.log(value.info === null);
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
                        onClick={event =>
                          this.getUserData(event, `${value.info.url}/following`)
                        }
                      >
                        <b>{value.info.following}</b>
                        <p>Following</p>
                      </li>
                      <li
                        className="user-followers"
                        onClick={event =>
                          this.getUserData(event, `${value.info.url}/followers`)
                        }
                      >
                        <b>{value.info.followers}</b>
                        <p>Followers</p>
                      </li>
                      <li
                        className="user-repos"
                        onClick={event =>
                          this.getUserData(event, `${value.info.url}/repos`)
                        }
                      >
                        <b>{value.info.public_repos}</b>
                        <p>Repos</p>
                      </li>
                    </ul>
                  </div>

                  {/* {user_data} */}
                  <Loading />
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
