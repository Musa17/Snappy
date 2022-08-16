import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "./JoinTeams.css";
import JoinGroupIcon from "../../../assets/images/Teams/joinGroup.png";
import * as chatApi from "../../../api/chatting";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";

const JoinTeams = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [code, setCode] = useState();

  // Function to join a team
  const JoinTeam = async () => {
    if (!code) {
      console.log("Enter Code");
      toast.error(`Enter teams`);
      return;
    }
    try {
      const res = await chatApi.joinTeam({
        memberId: state._id,
        code,
      });
      if (!res.data.status) console.log(res.data.message);
      else {
        props.newTeamsHadler(res.data.data);
        history.push("/teams");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        `${
          err.response && err.response.data
            ? err.response.data.message
            : "Something went wrong."
        }`
      );
    }
  };
  return (
    <div className="createTeams">
      <ToastContainer />
      <div className="createTeamsProfile">
        <img className="createTeamsProfileImage" src={JoinGroupIcon}/>
      </div>
      <div className="createTeamsHeading">Join a team with a code</div>
      <div>
        <input
          placeholder="Enter code"
          className="JoinTeams"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <Button className="createTeamsBtn" onClick={JoinTeam}>
        Join Teams
      </Button>
    </div>
  );
};

export default JoinTeams;
