import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { validateForm } from "../configs/validateForm";
import { auth } from "../configs/firebase";
import { addUser } from "../store/userSlice";

const handleSubmitLogic = (
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
) => {
  e.preventDefault();
  setIsError("");
  setIsLoading(true);
  let message;
  if (isSignInForm) {
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
          const { uid, email, displayName } = user;
          // console.log(user);
          localStorage.setItem(
            "user",
            JSON.stringify({ uid, email, displayName })
          );
          dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
          navigate("/");
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsError(errorCode + "-" + errorMessage);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
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
              localStorage.setItem(
                "user",
                JSON.stringify({ uid, email, displayName })
              );
              dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
              setIsLoading(false);
            })

            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              setIsError(errorCode + "-" + errorMessage);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsError(errorCode + "-" + errorMessage);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }
};

export default handleSubmitLogic;
