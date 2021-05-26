import React, { useRef } from "react";
import { addCommentHandlerApi } from "../api/AuthApi";
import { useSelector } from "react-redux";

export default function AddCommentsForm() {
  const userId = useSelector((state) => state.auth.autoId);
  const quoteId = useSelector((state) => state.auth.quoteId);
  const commentRef = useRef();
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;

    await addCommentHandlerApi(userId, quoteId, comment);
    commentRef.current.value = "";
  };
  return (
    <form onSubmit={addCommentHandler}>
      <label htmlFor="comment" className="form-label">
        <h3>Add Comment: </h3>
      </label>
      <input
        type="text"
        id="comment"
        className="form-control"
        ref={commentRef}
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
}
