import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import SnappyLogo from "../../../assets/images/SnappyLogo.png";
import SearchResults from "./SearchResults/SearchResult";
import "./HeadBar.css";

const HeadBar = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const history = useHistory();
  console.log(search);

  // function to clear the search
  const clearResultHandler = () => setSearch();

  return (
    <div className="headBar">
      <div className="headBarBox">
        <img className="SnappyLogo" src={SnappyLogo} alt="logo" onClick={() => history.push("/")}/>{" "}
      </div>
      <div className="headSubBarBox">
        <div className="headBarHeading">
          <div className="headBarText">Snappy</div>
        </div>
        <div className="headBarSearch">
          <input
            type="text"
            className="headerBarSearchInput"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {search && (
            <SearchResults
              search={search}
              onClearHandler={clearResultHandler}
            />
          )}
        </div>
        {state && (
            <div className="headerBarProfile">
              <Dropdown>
                <Dropdown.Toggle
                  className="headerBarProfileImg"
                  variant="success"
                  id="dropdown-basic"
                  onMouseOver={() => { 
                    let button = document.getElementById("dropdown-basic");
                    button.style.setProperty("background-color", "#494a8c", "important");
                    button.style.setProperty("border-color", "#494a8c", "important");
                  }}
                  onMouseOut={() => { 
                    let button = document.getElementById("dropdown-basic");
                    button.style.backgroundColor = "#7f81e1";
                    button.style.borderColor = "#7f81e1";
                  }}
                >
                  {state.name.match(/\b(\w)/g).join("")}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownBody">
                  <div className="profileOfUser">
                    <div className="profileOfUserImg">
                      {state.name.match(/\b(\w)/g).join("")}
                    </div>
                    <div className="profileOfUserImgDetails">
                      <div className="profileOfUserImgDetailsName">
                        {state.name}
                      </div>
                      <div className="profileOfUserImgDetailsEmail">
                        {state.email}
                      </div>
                    </div>
                  </div>
                  <a href="/">
                    <div
                      className="signout"
                      onClick={() => {
                        // function to clear the user data in the local storage and state
                        localStorage.clear();
                        dispatch({ type: "CLEAR" });
                        history.push("/home");
                      }}
                    >
                      Sign Out
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
      </div>
    </div>
  );
};

export default HeadBar;

// #7F81E1
