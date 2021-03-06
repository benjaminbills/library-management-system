import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
function Header() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/collectedbooks">
          SML
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/students">
            Students
          </Link>
          <Link className="nav-link" to="/collectedbooks">
            Library
          </Link>
          <Link className="nav-link" to="/books">
            Books
          </Link>
          {!userInfo && (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
          {userInfo && (
            <button
              className="nav-link"
              aria-current="page"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
