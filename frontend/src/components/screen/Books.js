import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  addBook,
  assignBook,
  deleteBook,
  getBooks,
} from "../../actions/bookActions";
import { getStudentProfile } from "../../actions/studentAction";
import { getUserProfile } from "../../actions/userActions";
import { ADD_BOOK_RESET } from "../../constants/bookConstant";
import Loader from "../Loader";
import Paginate from "../Paginate";

function Books(props) {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const authorRef = useRef("");
  const titleRef = useRef("");
  const subjectRef = useRef("");
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState("");
  const [showHide, setShowHide] = useState(false);
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books, page, pages } = bookList;
  const addB = useSelector((state) => state.addBook);
  const { success: successCreate, loading: addBookLoading, book } = addB;
  let location = history.location.pathname;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let renderEditAndDelete = location === "/books";

  const searchChangeHandler = () => {
    setSearch(
      `title=${titleRef.current.value}&author=${authorRef.current.value}&subject=${subjectRef.current.value}`
    );
    dispatch(
      getBooks(
        `title=${titleRef.current.value}&author=${authorRef.current.value}&subject=${subjectRef.current.value}`
      )
    );
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      dispatch(deleteBook(id));
    }
    window.location.reload();
  };
  const assignBookHandler = (id) => {
    dispatch(assignBook(props.studentId, id));
    dispatch(getStudentProfile(props.studentId));
    dispatch(
      getBooks(
        `title=${titleRef.current.value}&author=${authorRef.current.value}&subject=${subjectRef.current.value}`
      )
    );
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch({ type: ADD_BOOK_RESET });
      if (successCreate) {
        history.push(`/books/edit/${book.id}`);
      } else {
        dispatch(
          getBooks(
            `title=${titleRef.current.value}&author=${authorRef.current.value}&subject=${subjectRef.current.value}`
          )
        );
      }
    }
  }, [dispatch, successCreate, book, history, userInfo]);

  const addBookHandler = () => {
    dispatch(addBook());
  };
  const changePageHandler = (selectedPage) => {
    dispatch(getBooks(`${search}&page=${selectedPage}`));
  };

  const nextPageHandler = () => {
    if (page < pages) {
      dispatch(getBooks(`${search}&page=${page + 1}`));
    } else {
      dispatch(getBooks(`${search}&page=${pages}`));
    }
  };
  const previousPageHandler = () => {
    if (page > 1) {
      dispatch(getBooks(`${search}&page=${page - 1}`));
    } else {
      dispatch(getBooks(`${search}&page=1`));
    }
  };
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("books", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/book/upload-books/",
        formData,
        config
      );
      setUploading(false);
      dispatch(
        getBooks(
          `title=${titleRef.current.value}&author=${authorRef.current.value}&subject=${subjectRef.current.value}`
        )
      );
    } catch (error) {
      console.log(error.response);
      //  error.response && error.response.data.detail
      //         ? error.response.data.detail
      //         : error.message,
      setUploadingError(error.response.data.detail);
      setUploading(false);
    }
  };
  const showHideUpload = () => {
    if (showHide) {
      setShowHide(false);
    } else {
      setShowHide(true);
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <h2>Books</h2>
      <button className="btn btn-dark" onClick={addBookHandler}>
        Add Books
      </button>
      <button className="btn btn-success" onClick={showHideUpload}>
        Upload Excel
      </button>
      {showHide && (
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload books In Excel Format
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => uploadHandler(e)}
          />
          {uploadingError && (
            <div className="alert alert-danger" role="alert">
              {uploadingError}
            </div>
          )}
        </div>
      )}
      {uploading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Subject</th>
              <th scope="col">Published</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="Title"
                  ref={titleRef}
                />
              </td>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="Author"
                  ref={authorRef}
                />
              </td>
              <td>
                <input
                  onChange={searchChangeHandler}
                  className="form-control"
                  placeholder="Subject"
                  ref={subjectRef}
                />
              </td>
            </tr>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>{book.subject}</td>
                <td>{book.published}</td>
                {renderEditAndDelete && (
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHandler(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
                {renderEditAndDelete && (
                  <td>
                    <Link to={`/books/edit/${book.id}`}>Edit</Link>
                  </td>
                )}
                {!renderEditAndDelete && (
                  <td>
                    <button
                      disabled={book.num_of_book <= 0}
                      onClick={() => assignBookHandler(book.id)}
                      className="btn btn-dark"
                    >
                      Assign Book
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Paginate
        page={page}
        pages={pages}
        onChangePage={changePageHandler}
        nextPage={nextPageHandler}
        previousPage={previousPageHandler}
      />
    </div>
  );
}

export default Books;
