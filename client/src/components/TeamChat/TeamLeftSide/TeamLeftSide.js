import "./TeamLeftSide.css";

// Left side of team
const TeamLeftSide = ({team}) => {

  return (
    <div className="teamLeftSide">
      <span className="teamLeftSideImg">
        {team && team.name.match(/\b(\w)/g).join("")}
      </span>
      <span className="teamLeftSideName">{team && team.name}</span>
    </div>
  );
};

export default TeamLeftSide;
