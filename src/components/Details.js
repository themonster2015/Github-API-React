import React from "react";
import Loading from "./Loading";
import { Consumer } from "../context";
import "./Details.css";
import axios from "axios";
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          if (this.state.loading) {
            return (
              <div className="user-data-loading">
                <Loading />
              </div>
            );
          } else {
            if (this.props.data === "FOLLOWING") {
              console.log(value.following);
              return <UserFollowList val={value.following} />;
            } else if (this.props.data === "FOLLOWERS") {
              console.log(value.followers);
              return <UserFollowList val={value.followers} />;
            } else {
              console.log(value.repos);
              return <UserReposList val={value.repos} />;
            }
          }
        }}
      </Consumer>
    );
  }
}
export default Details;

function UserReposList(props) {
  if (props.val) {
    return (
      <ul className="detail_listings">
        {props.val.map(({ id, full_name, stargazers_count, html_url }) => (
          <li key={id} className="repos-list">
            <h3>
              <a className="user-repos-name" href={html_url}>
                {full_name}
              </a>
            </h3>
            <div className="user-repos-stars">
              <i className="fa fa-star"></i>
              {stargazers_count}
            </div>
          </li>
        ))}
      </ul>
    );
  } else {
    return "";
  }
}
function UserFollowList(props) {
  if (props.val) {
    return (
      <ul className="detail_listings">
        {props.val.map(({ id, login, avatar_url, html_url }) => (
          <li key={id} className="follow-list">
            <img className="user-data-img" src={avatar_url} alt="" />
            <h3>
              <a className="user-data-login" href={html_url}>
                {login}
              </a>
            </h3>
          </li>
        ))}
      </ul>
    );
  } else {
    return "";
  }
}
