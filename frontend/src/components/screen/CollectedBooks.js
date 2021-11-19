import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booksCollected } from "../../actions/bookActions";
import Loader from "../Loader";
import Paginate from "../Paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import YesNoButton from "../YesNoButton";

function CollectedBooks() {
  const studentNameRef = useRef("");
  const admissionNumRef = useRef("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [collectedBooks, setCollectedBooks] = useState([]);
  const classRef = useRef("");
  const bookRef = useRef("");
  const authorRef = useRef("");
  const dispatch = useDispatch();
  const booksCollectedAll = useSelector((state) => state.booksCollectedAll);
  const { loading, books } = booksCollectedAll;
  useEffect(() => {
    if (!books) {
      dispatch(booksCollected());
    } else {
      setCollectedBooks(books);
    }
  }, [dispatch, books]);

  const searchChangeHandler = (e) => {
    setSearch(
      `student=${studentNameRef.current.value}&admission=${admissionNumRef.current.value}&class=${classRef.current.value}&book=${bookRef.current.value}&author=${authorRef.current.value}`
    );
    dispatch(
      booksCollected(
        `student=${studentNameRef.current.value}&admission=${admissionNumRef.current.value}&class=${classRef.current.value}&book=${bookRef.current.value}&author=${authorRef.current.value}`
      )
    );
  };

  const filterYesNo = () => {
    let filteredBooks;
    if (filter) {
      filteredBooks = books.filter((book) => book.isReturned === true);
      setFilter(false);
    } else {
      filteredBooks = books.filter((book) => book.isReturned === false);
      setFilter(true);
    }
    setCollectedBooks(filteredBooks);
  };

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
            <th scope="col">Admission Num</th>
            <th scope="col">Class</th>
            <th scope="col">Book</th>
            <th scope="col">Author</th>
            <th scope="col">Returned</th>
            <th scope="col">Collected On</th>
            <th scope="col">Returned On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                onChange={searchChangeHandler}
                className="form-control"
                placeholder="Student"
                ref={studentNameRef}
              />
            </td>
            <td>
              <input
                onChange={searchChangeHandler}
                className="form-control"
                placeholder="Admission"
                ref={admissionNumRef}
              />
            </td>
            <td>
              <input
                onChange={searchChangeHandler}
                className="form-control"
                placeholder="Class"
                ref={classRef}
              />
            </td>
            <td>
              <input
                onChange={searchChangeHandler}
                className="form-control"
                placeholder="Book"
                ref={bookRef}
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
              <button onClick={filterYesNo}>yes</button>
            </td>
          </tr>
          {collectedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.student.name}</td>
              <td>{book.student.admission_num}</td>
              <td>{book.student.class_detail}</td>
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
