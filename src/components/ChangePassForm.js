import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changePasswordHandlerApi } from "../api/AuthApi";
import { AuthActions } from "../store/auth-slice";
const CHANGE_PASSWORD_API =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHTQ2Oh2I44-W7-LjhcCkSLjnFX66jp0g";

export default function ChangePassForm() {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    try {
      await changePasswordHandlerApi(CHANGE_PASSWORD_API, token, password);
      dispatch(
        AuthActions.showAlertHandler({
          message: "Password Changed Successfully!",
          status: "success",
        })
      );
    } catch (err) {
     
      dispatch(
        AuthActions.showAlertHandler({
          message: err.message,
          status: "danger",
        })
      );
    }
    
    passwordRef.current.value = "";
  };

  return (
    <>
      <h3>Enter New Password: </h3>
      <form onSubmit={changePasswordHandler}>
        <label htmlFor="newpassword" className="form-label">
          Password:
        </label>
        <input
          type="password"
          id="newpass"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          ref={passwordRef}
        />{" "}
        <br />
        <button type="submit" className="btn btn-success">
          Change Password
        </button>
        <Link to="/profile" className="btn btn-outline-secondary">Go Back</Link>
      </form>
    </>
  );
}
