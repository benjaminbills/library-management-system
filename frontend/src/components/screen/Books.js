import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBooks } from "../../actions/bookActions";
import SearchBox from "./SearchBox";

function Books(props) {
  const dispatch = useDispatch();
  const authorRef = useRef("");
  const titleRef = useRef("");
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;
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
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
