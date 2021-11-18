import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getStudents, registerStudent } from "../../actions/studentAction";
import { STUDENT_RESGISTER_RESET } from "../../constants/studentConstant";
import Loader from "../Loader";
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
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const classDetailRef = useRef("");
  const admissionNumRef = useRef("");
  const schoolIdRef = useRef("");
  const userNameSearchRef = useRef("");
  const classSearchRef = useRef("");
  const [search, setSearch] = useState("");
  const [excelFile, setExcelFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const studentRegister = useSelector((state) => state.studentRegister);
  const { success, loading, studentInfo, error } = studentRegister;
  const studentList = useSelector((state) => state.studentList);
  const {
    success: userListSuccess,
    loading: userListLoading,
    students,
    error: userListError,
    page,
    pages,
  } = studentList;
  const openModalHandler = () => {
    dispatch({ type: STUDENT_RESGISTER_RESET });
    setOpen(true);
  };
  const closeModalHandler = () => {
    setOpen(false);
    dispatch({ type: STUDENT_RESGISTER_RESET });
  };
  const registerStudentHandler = (e) => {
    e.preventDefault();
    let name = nameRef.current.value;
    let admissionNum = admissionNumRef.current.value;
    let classDetail = classDetailRef.current.value;
    let phone = phoneRef.current.value;
    dispatch(registerStudent(name, admissionNum, classDetail, phone));
  };
  useEffect(() => {
    dispatch(getStudents());
    dispatch({ type: STUDENT_RESGISTER_RESET });
  }, [dispatch]);

  const searchChangeHandler = (e) => {
    setSearch(
      `admission_num=${schoolIdRef.current.value}&name=${userNameSearchRef.current.value}&email=${classSearchRef.current.value}`
    );
    dispatch(
      getStudents(
        `admission_num=${schoolIdRef.current.value}&name=${userNameSearchRef.current.value}&email=${classSearchRef.current.value}`
      )
    );
  };
  const showHideUpload = () => {
    if (showHide) {
      setShowHide(false);
    } else {
      setShowHide(true);
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("students", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/student/upload-excel/",
        formData,
        config
      );
      setUploading(false);
      dispatch(getStudents());
    } catch (error) {
      setUploading(false);
    }
  };
  const changePageHandler = (selectedPage) => {
    dispatch(getStudents(`${search}&page=${selectedPage}`));
  };

  const nextPageHandler = () => {
    if (page < pages) {
      dispatch(getStudents(`${search}&page=${page + 1}`));
    } else {
      dispatch(getStudents(`${search}&page=${pages}`));
    }
  };
  const previousPageHandler = () => {
    if (page > 1) {
      dispatch(getStudents(`${search}&page=${page - 1}`));
    } else {
      dispatch(getStudents(`${search}&page=1`));
    }
  };

  return (
    <div>
      <div>
        <h2>Books</h2>
        <button className="btn btn-dark my-4" onClick={openModalHandler}>
          Register Student
        </button>
        <button className="btn btn-success" onClick={showHideUpload}>
          Upload Excel
        </button>
        {showHide && (
          <div class="mb-3">
            <label htmlFor="formFile" class="form-label">
              Upload Students In Excel Format
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={(e) => uploadFileHandler(e)}
            />
          </div>
        )}
        {uploading && <Loader />}
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
              {studentInfo.name} id {studentInfo.admission_num}
            </p>
          )}
          <form onSubmit={registerStudentHandler}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" ref={nameRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Admission number</label>
              <input
                type="text"
                className="form-control"
                ref={admissionNumRef}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Class Details</label>
              <input
                type="text"
                className="form-control"
                ref={classDetailRef}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="number" className="form-control" ref={phoneRef} />
            </div>
            <button className="btn btn-dark">Submit</button>
          </form>
          <button className="btn btn-secondary" onClick={closeModalHandler}>
            Close
          </button>
        </Modal>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Admission Num</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Phone</th>
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
                  ref={classSearchRef}
                />
              </td>
            </tr>

            {students.map((student) => (
              <tr key={student.admission_num}>
                <td>{student.admission_num}</td>
                <td>{student.name}</td>
                <td>{student.class_detail}</td>
                <td>{student.phone}</td>
                <td>
                  <Link to={`/students/${student.admission_num}`}>
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
