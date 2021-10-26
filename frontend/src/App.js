import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </div>
    </Router>
  );
}

export default App;
