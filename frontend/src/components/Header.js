import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
function Header() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand" href="#">
          Navbar
        </button>

        <div className="navbar-nav">
          <Link className="nav-link" aria-current="page" to="/">
            Home
          </Link>
          <button
            className="nav-link"
            aria-current="page"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
