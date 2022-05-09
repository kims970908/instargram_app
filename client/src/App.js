import { useEffect } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import PageRender from "./PageRender";

import Home from "../src/pages/home";
import Login from "../src/pages/login";
// import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/Header";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Router>
          <Alert />

          <input type="checkbox" id="theme" />
          <div className="App">
            <div className="main">
              {auth.token && <Header />}
              <Route exact path="/" component={auth.token ? Home : Login} />

              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:id" component={PageRender} />
            </div>
          </div>
        </Router>
      </BrowserRouter>
    </>
  );
}

export default App;
