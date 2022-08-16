import React from "react";
import "./Loading.css";
import LoadingIcon from "../../../assets/images/Loading/SnappyLogo.png";
import LoadingGif from "../../../assets/images/Loading/Loading.gif";

// When the site is fetching data from the backend
const Loading = (props) => {
  return (
    <div className="Loading">
      <img className="LoadingImage" src={LoadingIcon} alt="teams" />
      <img className="LoadingGif" src={LoadingGif} alt="loadingGif" />
    </div>
  );
};

export default Loading;
