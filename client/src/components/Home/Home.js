import React from "react";
import "./Home.css";
import SnappyLogo from "../../assets/images/SnappyLogo.png";
import HomeImg from "../../assets/images/Home/Home.png";
import FooterImg from "../../assets/images/Home/Footer.png";
import LeftGif from "../../assets/images/Home/LeftGif.gif";
import RightGif from "../../assets/images/Home/RightGif.gif";
import { useHistory } from "react-router-dom";

// Home page of the site
const Home = (props) => {
  const history = useHistory();
  return (
    <div className="Home">
      <div className="NavHome">
        {" "}
        <img className="SnappyLogo" src={SnappyLogo} alt="logo" onClick={() => history.push("/")}/>{" "}
        <div className="teamsHeadingHome">Snappy</div>
      </div>
      <div className="lineMs">
        Now use Snappy with family and friends to call, chat, and make plans.
      </div>
      <div className="homePgRow">
        <div className="homePgCol colLeft">
          <div className="homePgMSHeading">Snappy</div>
          <div className="desc">
            Meet, chat, call, and collaborate in just one place.
          </div>
          <div>
            <div className="signupHome" onClick={() => history.push("/signup")}>
              Sign up for free
            </div>
            <div className="signinHome" onClick={() => history.push("/login")}>
              Sign in
            </div>
          </div>
        </div>
        <div className="homePgCol">
          <img src={HomeImg} alt="home" className="homeImg" />
        </div>
      </div>
      <div className="footerContainer">
        <img src={FooterImg} alt="footer" className="footerImg" />
        <div className="footerInfo">
          <div className="footerHeadingBlocks">
            <div className="contactBlock">
              Stay in touch
              <div className="contactInfoBlock">
                <div className="emailBlock">
                  <div className="emailSubheading">
                    Email
                  </div>
                  <div className="emailContent">
                    development@snappy.com
                  </div>
                </div>
                <div className="phoneBlock">
                  <div className="phoneSubheading">
                    Phone
                  </div>
                  <div className="phoneContent">
                    020-123-456
                  </div>
                </div>
              </div>
            </div>
            <div className="locationBlock">
              Where we are
              <div className="locationInfoBlock">
                <div className="addressBlock">
                  <div className="addressSubheading">
                    Address
                  </div>
                  <div className="addressContent">
                    <div>
                      Split, Croatia
                    </div>
                    <div>
                      Metković, Croatia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gifContainer">
          <img src={LeftGif} alt="left_gif" className="leftGif" />
          <img src={RightGif} alt="right_gif" className="rightGif" />
        </div>

      </div>
    </div>
  );
};

export default Home;
