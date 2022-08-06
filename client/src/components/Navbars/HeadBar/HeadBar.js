import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { UserContext } from "../../../App";
import SnappyLogo from "../../../assets/images/SnappyLogo.png";
import "./HeadBar.css";

const HeadBar = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");

  return (
    <div className="headBar">
      {window.innerWidth > 862 && (
        <div className="headBarBox">
          <img className="SnappyLogo" src={SnappyLogo} alt="logo" />{" "}
        </div>
      )}
      <div className="headSubBarBox">
        {window.innerWidth > 862 && (
          <div className="headBarHeading">
            <div className="headBarText">Snappy</div>
          </div>
        )}
        <div className="headBarSearch">
          <input
            type="text"
            className="headerBarSearchInput"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {state && (
            <div className="headerBarProfile">
              <Dropdown>
                <Dropdown.Toggle
                  className="headerBarProfileImg"
                  variant="success"
                  id="dropdown-basic"
                >
                  {state.name.match(/\b(\w)/g).join("")}
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadBar;

// #7F81E1
