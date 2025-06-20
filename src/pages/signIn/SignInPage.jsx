import { useRef, useState } from "react";
import "./signInPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import handleSubmitLogic from "../../utils/configs/handleSubmitLogic";
import loader from "../../assets/loader.svg";

const SignInPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);
  const handleSubmit = (e) => {
    handleSubmitLogic(
      e,
      setIsError,
      isSignInForm,
      email,
      password,
      confirmPassword,
      name,
      dispatch,
      navigate,
      setIsLoading
    );
  };

  const toggleSignInForm = () => {
    email.current.value = "";
    password.current.value = "";
    setIsError("");
    if (!isSignInForm) {
      confirmPassword.current.value = "";
      name.current.value = "";
    }
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="signIn-main">
      <form className="signIn-form" name="signInForm" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            name="name"
            autoComplete="name"
          />
        )}
        <input
          type="email"
          placeholder="Email ID"
          ref={email}
          name="email"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          name="password"
        />
        {!isSignInForm && (
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            name="confirmPassword"
          />
        )}
        <p id="error-mssg">{isError}</p>
        <button type="submit" id="submit-form">
          {isLoading ? (
            <img src={loader} alt="Loading" />
          ) : isSignInForm ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="new-user">
          {isSignInForm ? "New to Blockbuster?" : "Already a Member?"}{" "}
          <a onClick={toggleSignInForm}>
            {isSignInForm ? "Sign Up Now" : "Sign In"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
