import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/auth-slice";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.token);
  const isLoginState = useSelector((state) => state.auth.isLoginState);
  const autoId = useSelector((state) => state.auth.autoId)
  const toggleState = (e) => {
    e.preventDefault();
    dispatch(AuthActions.toggleHandler());
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(AuthActions.logoutHandler());
    history.replace("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={loggedIn ? `/quotes/${autoId}` : "/welcome"} className="navbar-brand">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!loggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary"
                  onClick={toggleState}
                >
                  {!isLoginState && <span>Login</span>}
                  {isLoginState && <span>Sign Up</span>}
                </button>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-warning"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to={`/quotes/${autoId}/addquote`}>
                  Add Quote
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
