import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";
import Loader from "../Loader";
function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    dispatch(login(email, password));
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push("/students");
    }
  }, [userInfo, history]);
  return (
    <div className="container pt-5">
      <form onSubmit={submitHandler}>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        <h2>Sign In</h2>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" ref={emailRef} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" ref={passwordRef} className="form-control" />
        </div>

        <button type="submit" className="btn btn-success mb-3">
          Login
        </button>
        <p>
          Forgot Password? <Link to="/forgotpassword">Reset Password</Link>
        </p>
        <p>
          Don't have an account <Link to="/register">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
