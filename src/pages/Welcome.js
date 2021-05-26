import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { fetchApi, findUserAndQuotes, signUpUser } from "../api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/auth-slice";
import ErrorModal from "../components/ErrorModal";

const AUTH_SIGNUP_DOMAIN =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHTQ2Oh2I44-W7-LjhcCkSLjnFX66jp0g";

const AUTH_LOGIN_DOMAIN =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHTQ2Oh2I44-W7-LjhcCkSLjnFX66jp0g";

export default function Welcome(props) {
  const history = useHistory();
  const login = useSelector((state) => state.auth.isLoginState);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const apiError = useSelector((state) => state.auth.apiError);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(AuthActions.setAuthApiError(""));
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const id = (Math.random() * 100000).toFixed(0);
    if (login) {
      try {
        const token = await fetchApi(AUTH_LOGIN_DOMAIN, email, password);
        dispatch(AuthActions.loginHandler({ token, id }));
        const userObj = await findUserAndQuotes(email);
        dispatch(AuthActions.addAutoId(userObj.autoId));
        history.replace(`/quotes/${userObj.autoId}`);
      } catch (err) {
        dispatch(AuthActions.setAuthApiError(err.message));
      }
    } else {
      try {
        const token = await fetchApi(AUTH_SIGNUP_DOMAIN, email, password);
        await signUpUser({ id, email });
        dispatch(AuthActions.loginHandler({ token, id }));
        const userObj = await findUserAndQuotes(email);
        dispatch(AuthActions.addAutoId(userObj.autoId));
        history.replace(`/quotes/${userObj.autoId}`);
      } catch (err) {
        dispatch(AuthActions.setAuthApiError(err.message));
      
      }
    }
  };
  return (
    <div>
      {apiError !== "" && <ErrorModal message={apiError} />}
      <h1 className="my-4 text-center">Welcome to Quotes App!</h1>
      {!login && <h3 className="text-center">Sign Up to continue</h3>}
      {login && <h3 className="text-center">Login to continue</h3>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            ref={emailRef}
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" ref={passwordRef} />
        </div>
        {!login && (
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        )}
        {login && (
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        )}
      </form>
    </div>
  );
}
