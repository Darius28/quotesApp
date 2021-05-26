import { createSlice } from "@reduxjs/toolkit";

const initialQuoteState = {
    quotes: [],
    quote: {},
    comments: []
}

const quoteSlice = createSlice({
    name: "quotes",
    initialState: initialQuoteState,
    reducers: {
        addQuote(state, action) {
            state.quotes = action.payload
        },
        getSingleQuote(state, action) {
            state.quote = action.payload
        },
        addComments(state, action) {
            state.comments = action.payload
        }
    }
})

export const QuoteActions = quoteSlice.actions

export default quoteSlice.reducer