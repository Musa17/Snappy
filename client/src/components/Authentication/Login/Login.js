import React, { useContext, useState } from "react";
import "../Authentication.css";
import SnappyLogo from "../../../assets/images/SnappyLogo.png";
import Details from "../Details";

import * as userApi from "../../../api/auth";
import { useHistory } from "react-router";
import { UserContext } from "../../../App";
import { ToastContainer, toast } from "react-toastify";

const Login = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const history = useHistory();
  const initialCredentials = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [step, setStep] = useState(1);

  // on changing the input value this function is called
  const onChangeHandler = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    if (step === 1 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else if (step === 2 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/.test(e.target.value)) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else {
      setButtonDisabled(true);
      console.log(buttonDisabled);
    }
  };

  // changing the slide for login
  const changeStep = () => {
    if (step === 1) {
      if (
        credentials.email &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)
      ){
        setButtonDisabled(true);
        setStep(2);
      }
    }
  };

  // When user press the submit button to login
  const onSubmitHandler = async () => {
    if (!credentials.password) {
      return;
    }

    userApi
      .login({
        email: credentials.email,
        password: credentials.password,
      })
      .then((result) => {
        localStorage.setItem("jwt", result.data.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        dispatch({ type: "USER", payload: result.data.data });
      })
      .catch((err) => {
        console.log(err);
        setCredentials(initialCredentials);
        setStep(1);
        toast(
          `${
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong."
          }`
        );
      });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="auth">
        <div>
          <h1 className="authTeamsHeading">Sign In</h1>
        </div>
        <div className="authCard">
          <div>
            <img className="logoImage" src={SnappyLogo} alt="logo" />

            {step === 1 && (
              <Details
                name="email"
                type="email"
                value={credentials.email}
                placeholder="someone@email.com"
                heading="Enter an email"
                description="We'll use this email to set up Snappy. If you already have a Snappy account, feel free to use that email here."
                onChangeHandler={onChangeHandler}
                errorMessage="It should be a valid email address!"
                pattern="\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+"
                required="true"
              />
            )}

            {step === 2 && (
              <Details
                email={credentials.email}
                name="password"
                type="password"
                value={credentials.password}
                placeholder="Password"
                heading="Enter password"
                onChangeHandler={onChangeHandler}
                errorMessage="Password should be 8-20 characters and include at least 1 lowercase letter, 1 uppercase letter and 1 number!"
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$"
                required="true"
              />
            )}
          </div>
          <div>
            {step < 2 ? (
              <button
                className="authBtn"
                onClick={changeStep}
                disabled={buttonDisabled}
              >
                Next
              </button>
            ) : (
              <button 
                className="authBtn"
                onClick={onSubmitHandler}
                disabled={buttonDisabled}>
                Submit
              </button>
            )}
          </div>
        </div>
        <div className="OtherAuth" onClick={() => history.push("/signup")}>
          Don't have an account? Click to Sign up
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
