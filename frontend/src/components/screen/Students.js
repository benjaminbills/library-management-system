import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUsers, registerStudent } from "../../actions/userActions";
import { REGISTER_STUDENT_RESET } from "../../constants/userConstant";
import Paginate from "../Paginate";

const customStyles = {
  overlay: {
    backgroundColor: "grey",
    opacity: "0.95",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Students(props) {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const schoolIdRef = useRef("");
  const userNameSearchRef = useRef("");
  const emailSearchRef = useRef("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const studentRegister = useSelector((state) => state.studentRegister);
  const { success, loading, studentInfo, error } = studentRegister;
  const userList = useSelector((state) => state.userList);
  const {
    success: userListSuccess,
    loading: userListLoading,
    students,
    page,
    pages,
  } = userList;
  const openModalHandler = () => {
    dispatch({ type: REGISTER_STUDENT_RESET });
    setOpen(true);
  };
  const closeModalHandler = () => {
    setOpen(false);
    dispatch({ type: REGISTER_STUDENT_RESET });
  };
  const registerStudentHandler = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let username = usernameRef.current.value;
    let schoolId = schoolIdRef.current.value;
    dispatch(registerStudent(email, username, schoolId));
  };
  useEffect(() => {
    dispatch(getUsers());
    dispatch({ type: REGISTER_STUDENT_RESET });
  }, [dispatch]);

  const searchChangeHandler = (e) => {
    setSearch(
      `id=${schoolIdRef.current.value}&user_name=${userNameSearchRef.current.value}&email=${emailSearchRef.current.value}`
    );
    dispatch(
      getUsers(
        `id=${schoolIdRef.current.value}&user_name=${userNameSearchRef.current.value}&email=${emailSearchRef.current.value}`
      )
    );
  };

  const changePageHandler = (selectedPage) => {
    dispatch(getUsers(`${search}&page=${selectedPage}`));
  };

  const nextPageHandler = () => {
    if (page < pages) {
      dispatch(getUsers(`${search}&page=${page + 1}`));
    } else {
      dispatch(getUsers(`${search}&page=${pages}`));
    }
  };
  const previousPageHandler = () => {
    if (page > 1) {
      dispatch(getUsers(`${search}&page=${page - 1}`));
    } else {
      dispatch(getUsers(`${search}&page=1`));
    }
  };
  return (
    <div>
      <div>
        <h2>Books</h2>
        <button className="btn btn-dark" onClick={openModalHandler}>
          Register Student
        </button>
        <Modal
          closeTimeoutMS={200}
          style={customStyles}
          isOpen={open}
          onRequestClose={closeModalHandler}
        >
          <h2>Register Student</h2>
          {error && <p>{error}</p>}
          {success && (
            <p>
              You have successfully created an account for student{" "}
              {studentInfo.email}
            </p>
          )}
          <form onSubmit={registerStudentHandler}>
            <div className="mb-3">
              <label className="form-label">School ID</label>
              <input type="text" className="form-control" ref={schoolIdRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" ref={usernameRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" ref={emailRef} />
            </div>
            <button>Submit</button>
          </form>
          <button className="btn btn-warning" onClick={closeModalHandler}>
            Close
          </button>
        </Modal>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Collected Books</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="ID"
                  ref={schoolIdRef}
                />
              </td>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="Name"
                  ref={userNameSearchRef}
                />
              </td>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="Email"
                  ref={emailSearchRef}
                />
              </td>
            </tr>

            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.user_name}</td>
                <td>{student.email}</td>
                <td>
                  <Link to={`/students/${student.id}`}>
                    <button className="btn btn-dark">Assign Book</button>
                  </Link>
                </td>
                <td>
                  {/* <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteHandler(book.id)}
                >
                  Delete
                </button> */}
                </td>
                <td>{/* <Link to={`/books/edit/${book.id}`}>Edit</Link> */}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-5">
          <Paginate
            page={page}
            pages={pages}
            onChangePage={changePageHandler}
            nextPage={nextPageHandler}
            previousPage={previousPageHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Students;
