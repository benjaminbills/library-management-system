import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../actions/userActions";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setMsg("Check your email for new password");
    setEmail("");
  };
  return (
    <div className="container pt-4">
      {msg && <p>{msg}</p>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
