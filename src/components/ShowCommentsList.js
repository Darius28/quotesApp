import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentHandlerApi, getCommentsHandlerApi } from "../api/AuthApi";
import { QuoteActions } from "../store/quote-slice";

export default function ShowCommentsList() {
  const userId = useSelector((state) => state.auth.autoId);
  const quoteId = useSelector((state) => state.auth.quoteId);
  const comments = useSelector((state) => state.quote.comments);
  const dispatch = useDispatch();

  const sendRequest = useCallback(async () => {
    const data = await getCommentsHandlerApi(userId, quoteId);
    dispatch(QuoteActions.addComments(data));
  }, [quoteId, userId, dispatch]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest, comments]);

  const deleteCommentHandler = async (id) => {
    await deleteCommentHandlerApi(userId, quoteId, id);
    await sendRequest();
  };

  return (
    <div className="my-4">
      {comments.length === 0 && <p className="text-center">No Comments Yet!</p>}
      {comments.length === 0 && (
        <p className="text-center">Add Comment to get started.</p>
      )}
      {comments.length !== 0 && <h3 className="text-center">Comments</h3>}
      <div className="text-center mb-4">
        <Link
          className="btn btn-outline-warning"
          to={`/quotes/${userId}/${quoteId}`}
        >
          Hide Comments
        </Link>
      </div>
      {comments.map((comment) => {
        return (
          <section key={comment.id}>
            <div className="card">
              <div className="card-body">{comment.comment}</div>
              <div>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={deleteCommentHandler.bind(null, comment.id)}
                >
                  Delete Comment
                </button>
              </div>
            </div>
            <br />
          </section>
        );
      })}
    </div>
  );
}
