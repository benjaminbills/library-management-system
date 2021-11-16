import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { returnBook } from "../../actions/bookActions";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../actions/studentAction";
import { getUserProfile } from "../../actions/userActions";
import {
  BOOK_ASSIGNED_RESET,
  BOOK_RETURN_RESET,
} from "../../constants/bookConstant";
import Books from "./Books";

function Student() {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState(true);
  const [classDetail, setClassDetail] = useState("");
  const [name, setName] = useState("");
  const [studentAdmissionNum, setStudentAdmissionNum] = useState("");
  const [hideShow, setHideShow] = useState(true);
  const [booksCollected, setBooksCollected] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const studentProfile = useSelector((state) => state.studentProfile);
  const { student } = studentProfile;
  const bookReturn = useSelector((state) => state.bookReturn);
  const { success } = bookReturn;
  const studentUpdateProfile = useSelector(
    (state) => state.studentUpdateProfile
  );
  const { success: updateSuccess, student: updateStudent } =
    studentUpdateProfile;
  const bookAssign = useSelector((state) => state.bookAssign);
  const { success: bookAssignSuccess } = bookAssign;
  useEffect(() => {
    dispatch({ type: BOOK_ASSIGNED_RESET });
    if (updateSuccess) {
      history.push(`/students/${updateStudent.admission_num}`);
    }
    if (
      !student ||
      success ||
      student.admission_num !== id ||
      bookAssignSuccess
    ) {
      dispatch(getStudentProfile(id));
      dispatch({ type: BOOK_RETURN_RESET });
    } else {
      setPhone(student.phone);
      setName(student.name);
      setClassDetail(student.class_detail);
      setStudentAdmissionNum(student.admission_num);
      setBooksCollected(student.booksCollected);
    }
  }, [
    dispatch,
    id,
    student,
    success,
    updateSuccess,
    history,
    updateStudent,
    bookAssignSuccess,
  ]);
  const returnBookHandler = (id) => {
    dispatch(returnBook(id));
  };
  const hideSectionHandler = () => {
    if (hideShow) {
      setHideShow(false);
    } else {
      setHideShow(true);
    }
  };
  const handleEdit = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStudentProfile(name, classDetail, studentAdmissionNum, phone, id)
    );
  };
  return (
    <div className="container">
      <div className="card mt-5 mb-5">
        <div className="card-header">
          <div className="row">
            <div className="col-9">Student Details</div>
            <div className="col-3">
              <button className="btn btn-dark" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <label>Student Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name}
              readOnly={edit}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <hr />
            <label>Class Detail</label>
            <input
              type="text"
              id="class-detail"
              placeholder="Enter Class"
              value={classDetail}
              readOnly={edit}
              className="form-control"
              onChange={(e) => setClassDetail(e.target.value)}
            />
            <hr />
            <label>Admission Number</label>
            <input
              type="number"
              id="admission_num"
              placeholder="Enter Uniqe Admission Number"
              value={studentAdmissionNum}
              readOnly={edit}
              className="form-control"
              onChange={(e) => setStudentAdmissionNum(e.target.value)}
            />
            <hr />
            <label>Phone</label>
            <input
              type="number"
              id="phone"
              placeholder="Enter Phone Number"
              value={phone}
              readOnly={edit}
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
            {!edit && <button className="btn btn-dark">Update Profile</button>}
          </form>
        </div>
      </div>
      <div className="card mt-5 mb-5">
        <div className="card-header">
          <div className="row">
            <div className="col-3">Books Collected</div>
            <div className="col-3">
              <button className="btn btn-dark" onClick={hideSectionHandler}>
                {hideShow ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
        {hideShow && (
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Collected on</th>
                  <th scope="col">Returned</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {booksCollected.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.book.title}</td>
                    <td>{book.collectedOn}</td>
                    <td>{book.isReturned ? <p>yes</p> : <p>No</p>}</td>
                    <td>
                      <button
                        disabled={book.isReturned}
                        className="btn btn-dark"
                        onClick={(e) => returnBookHandler(book.id)}
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Books studentId={studentAdmissionNum} />
    </div>
  );
}

export default Student;
