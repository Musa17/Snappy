import React, { useEffect, useState } from "react";
import "./ChatBar.css";
import VideoCameraImg from "../../../assets/images/Chat/VideoCamera.png";
import VideoCameraHoverImg from "../../../assets/images/Chat/VideoCamera-hover.png";
import LeftArrow from "../../../assets/images/Chat/LeftArrow.png";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

// Common bar used in all the chat and notes pages
const ChatBar = (props) => {
  const [user, setUser] = useState();
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // To get the other user from personal chat
    if (props.conversation) {
      const friendId = props.conversation.members.find(
        (m) => m._id !== props.currentUser._id
      );
      setUser(friendId);
    }
  }, [props.conversation, props.currentUser._id]);

  return (
    <div className={props.team ? "ChatBar" : "ChatBarChat"}>
      <div className={props.team ? "ChatBarInfo" : "ChatBarInfoChat"}>
        {window.innerWidth <= 900 && user && (
          <div className="leftArrow" onClick={() => props.onGoBack()}>
            <img src={LeftArrow} className="leftArrowImage" />
          </div>
        )}

        {(user || props.name) && (
          <div className="ChatBarNameImg">
            {user && user.name.match(/\b(\w)/g).join("")}
            {props.name && props.name.match(/\b(\w)/g).join("")}
          </div>
        )}
        {props.team && (
          <div className="ChatBarNameImgTeams">
            {" "}
            {props.team.name.match(/\b(\w)/g).join("")}
          </div>
        )}

        <div className={props.team ? "ChatBarTeamName" : "ChatBarTeamNameChat"}>
          {" "}
          {user && user.name}
          {/* {props.team && props.team.name} */}
          {props.team &&
            window.innerWidth > 685 &&
            props.team.name.substring(0, Math.min(30, props.team.name.length))}
          {props.team &&
            window.innerWidth > 445 &&
            window.innerWidth <= 685 &&
            props.team.name.substring(0, Math.min(15, props.team.name.length))}
          {props.team &&
            window.innerWidth <= 445 &&
            props.team.name.substring(0, Math.min(5, props.team.name.length))}
          {props.team &&
            window.innerWidth > 685 &&
            props.team.name.length > 30 &&
            "..."}
          {props.team &&
            window.innerWidth > 445 &&
            window.innerWidth <= 685 &&
            props.team.name.length > 15 &&
            "..."}
          {props.team &&
            window.innerWidth <= 445 &&
            props.team.name.length > 5 &&
            "..."}
          {props.name && props.name}
        </div>
        {props.tabs && (
          <div className="tabs">
            <div
              id="chatTab"
              className={props.active === "Chat" ? "active" : "chatTab"}
              onClick={() => props.onChangeTab("Chat")}
            >
              Chat
            </div>
            <div
              id="notesTab"
              className={props.active === "Notes" ? "active" : "noteTab"}
              onClick={() => props.onChangeTab("Notes")}
            >
              Notes
            </div>
          </div>
        )}
        {props.team && (
          <Dropdown>
            <Dropdown.Toggle
              className="codeBtn"
              variant="success"
              id="dropdown-basic"
            >
              ⋮
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownBody codeBody">
              <div className="teamCode">
                <div>Team Code:</div>
                <div>{props.team.code}</div>
                <CopyToClipboard
                  text={props.team.code}
                  onCopy={() => {
                    setCopied(true);
                    toast.success(`${"Text copied"}`);
                  }}
                >
                  <div className="copy">Copy</div>
                </CopyToClipboard>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      <div className={props.team ? "ChatBarLeaveTeam"  : "ChatBarLeaveTeamChat"}>
        {props.video && (
          <div className="CharBarRight">
            <div
              className={props.team ? "ChatBarVideoCalling" : "ChatBarVideoCallingChat"}
              onClick={() => {
                if (props.conversation)
                  history.push(`/room/${props.conversation._id}`);
                else history.push(`/room/${props.team._id}`);
              }}
              onMouseOver={() => { 
                let img = document.getElementById("videoCallImage");
                img.src = VideoCameraHoverImg;
              }}
              onMouseOut={() => { 
                let img = document.getElementById("videoCallImage");
                img.src = VideoCameraImg;
              }}
            >
              <img
                src={VideoCameraImg}
                id="videoCallImage"
                alt="video"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {props.leave && (
          <div className="leaveTeam" onClick={() => props.onLeave()}>
            Leave
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBar;
