import { Switch, Route, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import AllQuotes from "./pages/AllQuotes";
import Profile from "./pages/Profile";
import AddQuote from "./pages/AddQuote";
import ViewFullQuote from "./pages/ViewFullQuote";
import { useSelector } from "react-redux";
import InvalidPage from "./components/InvalidPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.token);
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          {isLoggedIn && (
            <Route path="/quotes/:userId" exact>
              <AllQuotes />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/quotes/:userId/addquote" exact>
              <AddQuote />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/quotes/:userId/:quoteId">
              <ViewFullQuote />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          <Route path="*">
            <InvalidPage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
