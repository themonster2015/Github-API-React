import React from "react";
import "./UserDisplay.css";
import { Consumer } from "../context";
import Details from "./Details";
import axios from "axios";
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
class UserDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infiniteData: [],
      data: "",
      hasMore: true,
      nextPage: 2,
      url: null,
      display_data: false
    };
  }
  getUserData = (dispatch, e, data, type) => {
    axios
      .get(`${data}`)
      .then(res => {
        this.setState({
          display_data: true,
          hasMore: true,
          data: type,
          url: data,
          infiniteData: res.data
        });
      })
      .then(() => {
        dispatch({
          type: type,
          payload: this.state.infiniteData
        });
      })

      .catch(err => {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: "Error retrieving info."
        });
      });
  };

  // infinite scrolling
  loadMore = dispatch => {
    if (this.state.hasMore === true) {
      let num = this.state.nextPage;
      axios
        .get(`${this.state.url}?page=${num}`)
        .then(res => {
          console.log(res.data);
          if (res.data.length > 0) {
            this.setState({
              hasMore: true,
              nextPage: num + 1,
              infiniteData: [...this.state.infiniteData, ...res.data]
            });
          } else {
            this.setState({
              hasMore: false,
              nextPage: 2
            });
          }
          return res;
        })
        .then(res =>
          dispatch({
            type: this.state.data,
            payload: this.state.infiniteData
          })
        )
        .catch(err => {
          console.log(err);
          dispatch({
            type: "ERROR",
            payload: "Error retrieving info."
          });
        });
    }
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
          this.loadMore.bind(this, value.dispatch);
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
                            "PUBLIC_REPOS"
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
                  {user_data ? (
                    // <InfiniteScroller
                    //   infiniteData={this.state.infiniteData}
                    //   hasMore={this.state.hasMore}
                    //   loadMore={this.loadMore(value.dispatch)}
                    //   user_data={user_data}
                    // />
                    <InfiniteScroll
                      // dataLength={value.info[dataLength]}
                      dataLength={this.state.infiniteData.length}
                      next={this.loadMore(value.dispatch)}
                      hasMore={this.state.hasMore}
                      loader={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {user_data}
                    </InfiniteScroll>
                  ) : (
                    ""
                  )}
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
