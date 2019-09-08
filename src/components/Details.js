import React from "react";
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
    let user_repos_list = <UserReposList data={this.props.data} />;
    let user_follow_list = <UserFollowList data={this.props.data} />;

    if (this.props.repos) {
      return user_repos_list;
    } else {
      return user_follow_list;
    }
  }
}
export default Details;

function UserReposList(props) {
  if (props.data) {
    return (
      <ul className="repos-ul">
        {props.data.map(({ id, full_name, stargazers_count, html_url }) => (
          <li key={id} className="repos-list">
            <h3>
              <a className="user-repos-name" href={html_url}>
                {full_name}
              </a>
            </h3>
            <div>
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
  if (props.data) {
    return (
      <ul className="detail_listings">
        {props.data.map(({ id, login, avatar_url, html_url }, idx) => (
          <li key={idx} className="follow-list">
            <img
              className="img-responsive user-data-img"
              src={avatar_url}
              alt=""
            />
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
