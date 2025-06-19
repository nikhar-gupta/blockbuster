import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import logo from "../../assets/full-logo.png";
import { removeUser } from "../../utils/store/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="header">
      <img
        alt="logo"
        className="--logo"
        src={logo}
        width={200}
        onClick={() => {
          navigate("/");
        }}
      />
      {user && (
        <div className="account">
          <div className="name">
            <p>{"Hi " + user.displayName + "!"}</p>
          </div>
          <div className="signout">
            <p
              onClick={() => {
                dispatch(removeUser());
              }}
            >
              Signout
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
