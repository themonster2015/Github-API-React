import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
export default function InfiniteScroller(props) {
  return (
    <InfiniteScroll
      // dataLength={value.info[dataLength]}
      dataLength={props.infiniteData.length}
      next={props.loadMore}
      hasMore={props.hasMore}
      loader={
        <div>
          <Loading />
        </div>
      }
    >
      {props.user_data}
    </InfiniteScroll>
  );
}
