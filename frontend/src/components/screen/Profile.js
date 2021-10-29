import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUserProfile, updateProfile } from "../../actions/userActions";

function Profile() {
  const history = useHistory();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserProfile(id));
      } else {
        setEmail(user.email);
        setName(user.user_name);
        setAbout(user.about);
      }
    }
  }, [id, dispatch, history, userInfo, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateProfile(name, about, password));
      dispatch(getUserProfile(id));
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="container pt-4">
      <h2>User Profile</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            className="form-control"
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            required
            type="name"
            id="name"
            placeholder="Enter name"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>About</label>
          <textarea
            className="form-control"
            value={about}
            id="floatingTextarea2"
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        {message && <p>{message}</p>}
        <div className="mb-3">
          <label htmlFor="name">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
