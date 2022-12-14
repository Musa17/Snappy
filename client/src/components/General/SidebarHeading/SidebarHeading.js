import React from "react";
import "./SidebarHeading.css";

// Sidebar in chats
const SidebarHeading = (props) => {
  return <div className="SidebarHeading">
    <div className="SidebarHeadingContent">{props.heading}</div>
  </div>;
};

export default SidebarHeading;
