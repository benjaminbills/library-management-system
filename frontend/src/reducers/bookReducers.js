import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  ADD_BOOK_FAIL,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  ADD_BOOK_RESET,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_ASSIGNED_REQUEST,
  BOOK_ASSIGNED_SUCCESS,
  BOOK_ASSIGNED_FAIL,
  BOOK_ASSIGNED_RESET,
} from "../constants/bookConstant";

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload.books };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addBookReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return { loading: true };
    case ADD_BOOK_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case ADD_BOOK_FAIL:
      return { loading: false, error: action.payload };
    case ADD_BOOK_RESET:
      return {};
    default:
      return state;
  }
};

export const BookDetailsReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const BookUpdateReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true, ...state };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_UPDATE_RESET:
      return { book: {} };
    default:
      return state;
  }
};

export const BookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookAssignReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_ASSIGNED_REQUEST:
      return { loading: true, success: false };
    case BOOK_ASSIGNED_SUCCESS:
      return { loading: false, success: true, issuedDetails: action.payload };
    case BOOK_ASSIGNED_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_ASSIGNED_RESET:
      return {};
    default:
      return state;
  }
};
