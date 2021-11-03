import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBookDetails, updateBook } from "../../actions/bookActions";
import { BOOK_UPDATE_RESET } from "../../constants/bookConstant";

function EditBook() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [numAvailable, setNumAvailable] = useState("");
  const params = useParams();
  const history = useHistory();
  let bookId = params.id;
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;
  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = bookUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      history.push("/books");
    } else {
      if (!book.title || book.id !== Number(bookId)) {
        dispatch(getBookDetails(bookId));
      } else {
        setBookTitle(book.title);
        setAuthor(book.author);
        setPublished(book.published);
        setNumAvailable(book.num_of_book);
      }
    }
  }, [bookId, dispatch, book, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({
        id: bookId,
        title: bookTitle,
        author,
        published,
        num_of_book: numAvailable,
      })
    );
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name">Title</label>
          <input
            required
            type="text"
            id="title"
            placeholder="Book title"
            value={bookTitle}
            className="form-control"
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author">Author</label>
          <input
            required
            type="text"
            placeholder="Author"
            value={author}
            className="form-control"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Published</label>
          <input
            className="form-control form-control-date"
            type="date"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Number Available</label>
          <input
            className="form-control form-control-date"
            type="number"
            value={numAvailable}
            onChange={(e) => setNumAvailable(e.target.value)}
          />
        </div>
        <button className="btn btn-dark">Submit</button>
      </form>
    </div>
  );
}

export default EditBook;
