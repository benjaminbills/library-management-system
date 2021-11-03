import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { addBook, deleteBook, getBooks } from "../../actions/bookActions";
import { ADD_BOOK_RESET } from "../../constants/bookConstant";
import SearchBox from "./SearchBox";

function Books(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const authorRef = useRef("");
  const titleRef = useRef("");
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;
  const addB = useSelector((state) => state.addBook);
  const { success: successCreate, loading: addBookLoading, book } = addB;
  const titleChangeHandler = (e) => {
    e.preventDefault();
    dispatch(
      getBooks(
        `title=${titleRef.current.value}&author=${authorRef.current.value}`
      )
    );
  };
  const authorChangeHandler = (e) => {
    e.preventDefault();
    dispatch(
      getBooks(
        `title=${titleRef.current.value}&author=${authorRef.current.value}`
      )
    );
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      dispatch(deleteBook(id));
    }
    window.location.reload();
  };
  useEffect(() => {
    dispatch({ type: ADD_BOOK_RESET });
    if (successCreate) {
      history.push(`/books/edit/${book.id}`);
    } else {
      dispatch(getBooks());
    }
  }, [dispatch, successCreate, book, history]);

  const addBookHandler = () => {
    dispatch(addBook());
  };
  return (
    <div>
      <h2>Books</h2>
      <button className="btn btn-dark" onClick={addBookHandler}>
        Add Books
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published</th>
            <th scope="col">Available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                onChange={titleChangeHandler}
                className="form-control"
                placeholder="Title"
                ref={titleRef}
              />
            </td>
            <td>
              <input
                onChange={authorChangeHandler}
                className="form-control"
                placeholder="Author"
                ref={authorRef}
              />
            </td>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
              <td>{book.num_of_book}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteHandler(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
