import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <div className="container pt-4">
      <form>
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
