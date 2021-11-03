import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./components/screen/Home";
import Login from "./components/screen/Login";
import Register from "./components/screen/Register";

import Header from "./components/Header";
import Profile from "./components/screen/Profile";
import ForgotPassword from "./components/screen/ForgotPassword";
import Books from "./components/screen/Books";
import EditBook from "./components/screen/EditBook";
function App() {
  return (
    <Router>
      <Header />
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/forgotpassword" component={ForgotPassword} exact />
        <Route path="/profile/:id" component={Profile} exact />
        <Route path="/books/" component={Books} exact />
        <Route path="/books/edit/:id" component={EditBook} exact />
      </div>
    </Router>
  );
}

export default App;
