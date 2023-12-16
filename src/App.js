import logo from "./logo.svg";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Verify from "./Verify";
import EmailVerified from "./Pages/EmailVerified";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Task from "./Pages/Task";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/verify" exact component={Verify} />
        <Route path="/successfulVerified" exact component={EmailVerified} />
        <Route path="/Task" exact component={Task} />
      </Switch>
    </Router>
  );
}

export default App;
