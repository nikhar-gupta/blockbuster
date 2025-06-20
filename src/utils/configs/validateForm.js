/* eslint-disable */
export const validateForm = (email, password, confirmPassword, name) => {
  if (email === "") {
    return "Please enter email !";
  } else if (password === "") {
    return "Please enter password !";
  }
  const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validatePassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (name === "") {
    return "Please enter your name!";
  } else if (!validateEmail) {
    return "Email ID is not valid!";
  } else if (!validatePassword) {
    return `Password must:
    - be at least 8 characters long
    - contain at least one letter
    - contain at least one uppercase letter (A-Z)
    - contain at least one lowercase letter (a-z)
    - contain at least one digit (0-9)`;
  } else if (confirmPassword === "") {
    return "Please confirm your password!";
  } else if (confirmPassword != null && password !== confirmPassword) {
    return "Password and confirm password should match!";
  } else return null;
};
