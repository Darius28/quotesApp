import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Route, Link } from "react-router-dom";
import { fetchSingleQuote } from "../api/AuthApi";
import Comments from "../components/Comments";
import { AuthActions } from "../store/auth-slice";
import { QuoteActions } from "../store/quote-slice";

export default function ViewFullQuote() {
  const quote = useSelector((state) => state.quote.quote);
  const dispatch = useDispatch();
  const params = useParams();
 

  const sendRequest = useCallback(async () => {
    const reqData = await fetchSingleQuote(params.userId, params.quoteId);
    dispatch(QuoteActions.getSingleQuote(reqData));
    dispatch(AuthActions.addQuoteId(params.quoteId))
  }, [dispatch, params.userId, params.quoteId]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  

  return (
    <>
      <div className="my-4">
        <div className="card">
          <div className="card-header">{quote.author}</div>
          <div className="card-body">
            <p className="card-text">{quote.quote}</p>
          </div>
        </div>
      </div>
      <Route path={`/quotes/${params.userId}/${params.quoteId}`} exact>
        <Link to={`/quotes/${params.userId}/${params.quoteId}/comments`}>
          <button className="btn btn-primary">View Comments</button>
        </Link>
      </Route>
      <Route path={`/quotes/${params.userId}/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
}
