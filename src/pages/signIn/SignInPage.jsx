import { useRef, useState } from "react";
import "./signInPage.css";
import { validateForm } from "../../utils/configs/validateForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/configs/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/store/userSlice";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isError, setIsError] = useState("");
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError("");
    let message;
    if (isSignInForm) {
      console.log(email.current.value, password.current.value);

      message = validateForm(email.current.value, password.current.value);
      setIsError(message);
      if (message === null) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("SignIn successfull!");
            console.log(user);
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({ uid: uid, email: email, displayName: displayName })
            );
            <Navigate to="/" />;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsError(errorCode + "-" + errorMessage);
          });
      }
    } else {
      message = validateForm(
        email.current.value,
        password.current.value,
        confirmPassword.current.value,
        name.current.value
      );
      setIsError(message);
      if (message === null) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: "../../assets/default-prof-pic.jpg",
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((error) => {
                // An error occurred
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsError(errorCode + "-" + errorMessage);
              });
            console.log("Signup successfull!");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsError(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  return (
    <div className="signIn-main">
      <form className="signIn-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {!isSignInForm && (
          <input type="text" placeholder="Full Name" ref={name} />
        )}
        <input type="email" placeholder="Email ID" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        {!isSignInForm && (
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
          />
        )}
        <p id="error-mssg">{isError}</p>
        <input
          type="submit"
          value={isSignInForm ? "Sign In" : "Sign Up"}
          id="submit-form"
        />
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
