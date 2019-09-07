import React from "react";
import Loading from "./Loading";
import { Consumer } from "../context";
import "./Details.css";
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
              return <UserFollowList val={value.following} />;
            } else if (this.props.data === "FOLLOWERS") {
              return <UserFollowList val={value.followers} />;
            } else {
              return <UserReposList val={value.public_repos} />;
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
        {/* {props.val.map(({ id, full_name, stargazers_count, html_url }) => (
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
        ) */}
        {Object.values(props.val).map(
          ({ id, full_name, stargazers_count, html_url }, idx) => {
            return (
              <li key={idx} className="repos-list">
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
            );
          }
        )

        // let { id, full_name, stargazers_count, html_url } = value;
        // console.log(full_name);
        // console.log(value);
        // return (
        //   <li key={id} className="repos-list">
        //     <h3>
        //       <a className="user-repos-name" href={html_url}>
        //         {full_name}
        //       </a>
        //     </h3>
        //     <div className="user-repos-stars">
        //       <i className="fa fa-star"></i>
        //       {stargazers_count}
        //     </div>
        //   </li>
        // );
        }
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
        {props.val.map(({ id, login, avatar_url, html_url }, idx) => (
          <li key={idx} className="follow-list">
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
