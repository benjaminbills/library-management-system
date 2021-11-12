import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { returnBook } from "../../actions/bookActions";
import { getUserProfile } from "../../actions/userActions";
import { BOOK_RETURN_RESET } from "../../constants/bookConstant";
import Books from "./Books";

function Student(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [hideShow, setHideShow] = useState(true);
  const [studentId, setStudentId] = useState("");
  const [booksCollected, setBooksCollected] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;
  const bookReturn = useSelector((state) => state.bookReturn);
  const { success } = bookReturn;
  useEffect(() => {
    if (!user || success || user.id !== Number(id)) {
      dispatch(getUserProfile(id));
      dispatch({ type: BOOK_RETURN_RESET });
    } else {
      setEmail(user.email);
      setName(user.user_name);
      setStudentId(user.id);
      setBooksCollected(user.booksCollected);
    }
  }, [dispatch, id, user, success]);
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

      <Books studentId={studentId} />
    </div>
  );
}

export default Student;
