import React, { useEffect } from "react";
import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteSingleQuote, getAllQuotes } from "../api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { QuoteActions } from "../store/quote-slice";

export default function AllQuotes() {
  const quotes = useSelector((state) => state.quote.quotes);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const sendRequest = useCallback(async () => {
    const reqdData = await getAllQuotes(userId);
    dispatch(QuoteActions.addQuote(reqdData));
  }, [userId, dispatch]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest, userId]);

  

  const deleteHandler = async (itemId) => {
   
    await deleteSingleQuote(itemId, userId);
   
    await sendRequest();
  };

  return (
    <div className="my-4">
      <h1 className="text-center">All Quotes!</h1>
      {quotes.length === 0 && (
        <p className="text-center">
          There are no Quotes. Add Quotes to get started!
        </p>
      )}
      {quotes.map((quote) => {
        
        return (
          <section key={quote.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{quote.author}</h5>
                <p className="card-text">{quote.quote}</p>
                <button
                  className="btn btn-warning"
                  onClick={deleteHandler.bind(null, quote.id)}
                >
                  Delete Quote
                </button>
                <Link
                  to={`/quotes/${userId}/${quote.id}`}
                  className="btn btn-info"
                >
                  View Quote
                </Link>
              </div>
            </div>
            <br />
          </section>
        );
      })}
    </div>
  );
}
