import React from "react";
import "./Loading.css";
import LoadingIcon from "../../../assets/images/Loading/SnappyLogo.png";

// When the site is fetching data from the backend
const Loading = (props) => {
  return (
    <div className="Loading">
      <img className="LoadingImage" src={LoadingIcon} alt="teams" />
    </div>
  );
};

export default Loading;
