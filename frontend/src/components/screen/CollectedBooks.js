import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booksCollected } from "../../actions/bookActions";
import Loader from "../Loader";
import Paginate from "../Paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function CollectedBooks() {
  const dispatch = useDispatch();
  const booksCollectedAll = useSelector((state) => state.booksCollectedAll);
  const { loading, books } = booksCollectedAll;
  useEffect(() => {
    dispatch(booksCollected());
  }, [dispatch]);
  return (
    <div>
      <ReactHTMLTableToExcel
        className="btn btn-dark my-5"
        table="collected-books-data"
        filename="collected-books-data"
        sheet="sheet 1"
        buttonText="Export to Excel"
      />
      <table className="table table-striped mb-5" id="collected-books-data">
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Book</th>
            <th scope="col">Author</th>
            <th scope="col">Returned</th>
            <th scope="col">Collected On</th>
            <th scope="col">Returned On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.user.user_name}</td>
              <td>{book.book.title}</td>
              <td>{book.book.author}</td>
              <td>{book.isReturned ? <p>yes</p> : <p>No</p>}</td>
              <td>{book.collectedOn.substring(0, 10)}</td>
              <td>
                {book.isReturned ? (
                  <p>{book.returnedOn.substring(0, 10)}</p>
                ) : (
                  <p>Not Yet</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Paginate
        page={page}
        pages={pages}
        onChangePage={changePageHandler}
        nextPage={nextPageHandler}
        previousPage={previousPageHandler}
      /> */}
    </div>
  );
}

export default CollectedBooks;
