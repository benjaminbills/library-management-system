import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../actions/userActions";
import Books from "./Books";

function Student() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;
  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile(id));
    } else {
      setEmail(user.email);
      setName(user.user_name);
      setStudentId(user.id);
    }
  }, [dispatch, id, user]);
  return (
    <div className="container">
      <div className="card mt-5 mb-5">
        <div className="card-header">Student Details</div>
        <div className="card-body">
          <p>Student ID: {studentId}</p>
          <hr />
          <p>Email:{email}</p>
          <hr />
          <p>Username:{name}</p>
        </div>
      </div>
      <Books studentId={studentId} />
    </div>
  );
}

export default Student;
