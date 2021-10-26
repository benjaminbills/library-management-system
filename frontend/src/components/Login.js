import React, { useRef } from "react";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
  };
  return (
    <div className="container pt-5">
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" ref={emailRef} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" ref={passwordRef} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
