import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import ChangePassForm from "../components/ChangePassForm";

export default function Profile() {
  const msg = useSelector((state) => state.auth.showAlert);
  const status = useSelector((state) => state.auth.showAlertType);
  return (
    <>
      {msg.length !== 0 && (
        <div className={`alert alert-${status} text-center`} role="alert">
          {msg}
        </div>
      )}
      <div>
        <h1 className="text-center my-4">Your Profile!</h1>
        <h4>Name: Test Name</h4>
        <h4>Email: Test Email</h4>
        <h4>Gender: Male/Female</h4>
        <hr />
        <Route path="/profile" exact>
          <div className="text-center">
            <Link to="/profile/changepassword" className="btn btn-secondary">
              Change Password
            </Link>
          </div>
        </Route>
        <Route path="/profile/changepassword">
          <ChangePassForm />
        </Route>
      </div>
    </>
  );
}
