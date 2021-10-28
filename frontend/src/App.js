import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/screen/Home";
import Login from "./components/screen/Login";
import Register from "./components/screen/Register";
import Header from "./components/Header";
function App() {
  return (
    <Router>
      <Header />
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </div>
    </Router>
  );
}

export default App;
