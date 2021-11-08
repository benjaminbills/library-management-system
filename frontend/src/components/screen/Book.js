import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  bookHistory,
  getBookDetails,
  getBooks,
  returnBook,
} from "../../actions/bookActions";
import { getUserProfile } from "../../actions/userActions";
import { BOOK_RETURN_RESET } from "../../constants/bookConstant";
import Books from "./Books";

function Book(props) {
  const [booksCollected, setBooksCollected] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;
  const historyOfBook = useSelector((state) => state.historyOfBook);
  const { bookHistory: bookMovement } = historyOfBook;
  useEffect(() => {
    if (!book.title || book.id !== Number(id)) {
      dispatch(getBookDetails(id));
      dispatch(bookHistory(id));
    } else {
      setBooksCollected(bookMovement);
    }
  }, [dispatch, id, book, bookMovement]);
  const returnBookHandler = (id) => {
    dispatch(returnBook(id));
  };
  return (
    <div className="container">
      <div className="card mt-5 mb-5">
        <div className="card-header">Book Details</div>
        <div className="card-body">
          <p>Book ID: {book.id}</p>
          <hr />
          <p>Title:{book.title}</p>
          <hr />
          <p>Published By:{book.published}</p>
        </div>
      </div>
      <div className="card mt-5 mb-5">
        <div className="card-header">Book Details</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Collected By</th>
                <th scope="col">Collected on</th>
                <th scope="col">Returned on</th>
                <th scope="col">Returned</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {booksCollected.map((book) => (
                <tr key={book.id}>
                  <td>{book.user.user_name}</td>
                  <td>{book.collectedOn}</td>
                  <td>{book.returnedOn}</td>
                  <td>{book.isReturned ? <p>yes</p> : <p>No</p>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Book;
