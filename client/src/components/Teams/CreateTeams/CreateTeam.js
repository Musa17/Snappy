import React, { useContext } from "react";
import UserIcon from "../../../assets/images/Teams/user.jpg";
import CreateGroupIcon from "../../../assets/images/Teams/createGroup.png";
import "./CreateTeams.css";
import { UserContext } from "../../../App";
import * as chatApi from "../../../api/chatting";
import { useHistory } from "react-router-dom";
import CreateTeamsModal from "./CreateTeamModal/CreateTeamModal";
import { ToastContainer, toast } from "react-toastify";

const CreateTeams = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const createTeam = async () => {
    try {
      const res = await chatApi.createTeam({
        creatorId: state._id,
      });
      if (!res.status) console.log(res.message);
      else {
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
        <img className="createTeamsProfileImage" src={CreateGroupIcon}/>
      </div>
      <div className="createTeamsHeading">Create a Teams</div>
      <div>
        <img className="createTeamsProfileImg" src={UserIcon} alt="" />
        <img className="createTeamsProfileImg" src={UserIcon} alt="" />
        <img className="createTeamsProfileImg" src={UserIcon} alt="" />
      </div>
      <CreateTeamsModal newTeamsHadler={(team) => props.newTeamsHadler(team)} />
    </div>
  );
};

export default CreateTeams;
