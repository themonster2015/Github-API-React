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
              <div className="row ">
                <div className="col-md-12 col-xs-12 col-sm-12">
                  <div className="row">
                    <div className="align-self-center col-md-4 col-sm-4 col-xs-12">
                      <img
                        className="user-img"
                        src={"" + value.info.avatar_url}
                        alt=""
                      />
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12">
                      <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                          <h1 className=" h5 ">
                            <em className="small">Username:</em>{" "}
                            {value.info.login}
                          </h1>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                          <button className="btn-danger btn">
                            <a
                              className="text-white"
                              href={value.info.html_url}
                            >
                              Visit Profile
                            </a>
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-xs-12 col-sm-12 user-stats">
                          <ul className="d-md-flex d-xs-inline-flex p-2 justify-content-between align-items-stretch list-unstyled">
                            <li
                              className="p-2"
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
                              className="p-2"
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
                              className="p-2"
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
                            <li className="p-2">
                              <b>Joined</b>
                              <p>
                                <Moment from={new Date()}>
                                  {value.info.created_at}
                                </Moment>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6 md-offset-6">
                        <p className="user-bio">{value.info.bio}</p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* end row *} */}
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
