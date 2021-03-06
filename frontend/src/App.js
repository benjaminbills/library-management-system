import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Login from "./components/screen/Login";
import Register from "./components/screen/Register";

import Header from "./components/Header";
import Profile from "./components/screen/Profile";
import ForgotPassword from "./components/screen/ForgotPassword";
import Books from "./components/screen/Books";
import EditBook from "./components/screen/EditBook";
import Students from "./components/screen/Students";
import Student from "./components/screen/Student";
import Book from "./components/screen/Book";
import CollectedBooks from "./components/screen/CollectedBooks";
function App() {
  return (
    <Router>
      <Header />
      <div>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/forgotpassword" component={ForgotPassword} exact />
        <Route path="/profile/:id" component={Profile} exact />
        <Route path="/books/" component={Books} exact />
        <Route path="/collectedbooks/" component={CollectedBooks} exact />
        <Route path="/books/:id" component={Book} exact />
        <Route path="/books/edit/:id" component={EditBook} exact />
        <Route path="/students/" component={Students} exact />
        <Route path="/students/:id" component={Student} exact />
      </div>
    </Router>
  );
}

export default App;
