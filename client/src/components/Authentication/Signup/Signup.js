import React, { useState } from "react";
import "../Authentication.css";
import SnappyLogo from "../../../assets/images/SnappyLogo.png";
import Details from "../Details";

import * as userApi from "../../../api/auth";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Signup = (props) => {
  const history = useHistory();
  const initialCredentials = {
    email: "",
    password: "",
    use: "",
    name: "",
  };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [step, setStep] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // on manage change of input values
  const onChangeHandler = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    if (step === 1 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else if (step === 2) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else if (step === 3 && /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,16}$/.test(e.target.value)) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else if (step === 4 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/.test(e.target.value)) {
      setButtonDisabled(false);
      console.log(buttonDisabled);
    } else if (step === 5 && credentials.password == e.target.value) {
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
    } else if (step === 2) {
      if (credentials.email && credentials.use) {
        setButtonDisabled(true);
        setStep(3);
      }
    } else if (step === 3) {
      if (credentials.email && credentials.use && credentials.name &&
        /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,16}$/.test(credentials.name)
      ){
        setButtonDisabled(true);
        setStep(4);
      }
    } else if (step === 4) {
      if (credentials.email && credentials.use && credentials.name && credentials.password &&
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/.test(credentials.password)
      ){
        setButtonDisabled(true);
        setStep(5);
      }
    }
  };

  // When user press the submit button to login
  const onSubmitHandler = async () => {
    if (!credentials.password) {
      return;
    }

    userApi
      .signup({
        email: credentials.email,
        password: credentials.password,
        use: credentials.use,
        name: credentials.name,
      })
      .then((result) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setStep(1);
        setCredentials(initialCredentials);
        toast.error(
          `${
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong."
          }`
        );
      });
  };

  return (
    <div className="auth">
      <ToastContainer />
      <div className="authTeamsHeading">
        Sign Up
      </div>
      <div className="authCard">
        <div>
          <img className="logoImage" src={SnappyLogo} alt="logo" />

          {step === 1 && (
            <Details
              key="1"
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
              key="2"
              name="use"
              type="radio"
              value={credentials.use}
              placeholder="Enter use"
              heading="How do you want to use Snappy?"
              onChangeHandler={onChangeHandler}
              options={[
                {
                  heading: "For school",
                  description:
                    "To connect students and faculty for courses and projects, in a classroom or online",
                },
                {
                  heading: "For friends and family",
                  description:
                    "For everyday life, to make audio or video calls",
                },
                {
                  heading: "For work and organizations",
                  description: "To work with teammates wherever they are",
                },
              ]}
            />
          )}
          {step === 3 && (
            <Details
              key="3"
              name="name"
              type="text"
              value={credentials.name}
              placeholder="John Doe"
              heading="Enter your full name"
              onChangeHandler={onChangeHandler}
              errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
              pattern="[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,16}"
              required="true"
            />
          )}
          {step === 4 && (
            <Details
              key="4"
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
          {step === 5 && (
            <Details
              key="5"
              email={credentials.email}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              heading="Confirm password"
              onChangeHandler={onChangeHandler}
              errorMessage="Passwords don't match!"
              pattern={credentials.password.toString()}
              required="true"
            />
          )}
        </div>
        <div>
          {step < 5 ? (
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
              disabled={buttonDisabled}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="OtherAuth" onClick={() => history.push("/login")}>
        Already have an account? Click to Sign in
      </div>
    </div>
  );
};

export default Signup;
