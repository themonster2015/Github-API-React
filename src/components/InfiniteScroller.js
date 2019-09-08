import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Details from "./Details";
export default class InfiniteScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: "",
      hasMore: true,
      nextDataPage: 2
    };
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    this.fetchData(this.props.data);
  }
  fetchData = data_url => {
    this.setState({
      loading: true,
      display: false
    });
    setTimeout(() => {
      fetch(data_url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({
            loading: false,
            display: true,
            data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }, 500);
  };
  // infinite scrolling
  fetchMoreData = () => {
    if (this.state.hasMore === true) {
      let num = this.state.nextDataPage;
      setTimeout(() => {
        fetch(`${this.props.data}?page=${num}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              this.setState({
                hasMore: true,
                nextDataPage: num + 1,
                data: this.state.data.concat(data)
              });
            } else {
              this.setState({
                hasMore: false,
                nextDataPage: 2
              });
            }
          });
      }, 500);
    }
  };

  render() {
    if (this.state.loading === true) {
      return (
        <div className="user-data-loading">
          <Loading />
        </div>
      );
    } else if (this.state.display === false) {
      return <div></div>;
    }

    let user_data_list;
    // console.log("this.state.data=", this.state.data);
    if (this.state.data[0].full_name) {
      user_data_list = <Details repos={true} data={this.state.data} />;
    } else {
      user_data_list = <Details data={this.state.data} />;
    }
    console.log("user-data-list", user_data_list);
    return (
      <div className="user-data-grid">
        <InfiniteScroll
          dataLength={this.state.data.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <div className="user-data-scrolling-loading">
              <Loading />
            </div>
          }
        >
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className="data-wrapper">{user_data_list}</div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}
