import React from "react";

const ShimmerHome = () => {
  return (
    <div className="cardContainer">
      {[...Array(10).keys()].map((c) => {
        return (
          <div className="card shimmer" key={c}>
            <div className="poster"></div>
            <div className="movieInfo"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerHome;
