import React from "react";

export default function ErrorModal(props) {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Error: </strong>{props.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
