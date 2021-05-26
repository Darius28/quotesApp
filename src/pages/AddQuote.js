import React, { useRef } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { addQuote } from "../api/AuthApi";

export default function AddQuote() {
  const history = useHistory();
  const authorRef = useRef();
  const quoteRef = useRef();
  const params = useParams();

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const author = authorRef.current.value;
    const quote = quoteRef.current.value;
    // const usersAndItems = await addQuote({
    //   author,
    //   quote,
    //   userId: params.userId,
    // });
    await addQuote({
      author,
      quote,
      userId: params.userId,
    });
    history.push(`/quotes/${params.userId}`);
  };

  return (
    <div>
      <h1 className="text-center my-4">Add Quote</h1>
      <Link className="btn btn-primary" to={`/quotes/${params.userId}`}>
        Click here to view All Quotes
      </Link>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            ref={authorRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quote" className="form-label">
            Quote
          </label>
          <textarea
            rows="5"
            cols="30"
            className="form-control"
            id="quote"
            ref={quoteRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
