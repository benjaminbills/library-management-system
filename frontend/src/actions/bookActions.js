import axios from "axios";
import {
  ADD_BOOK_FAIL,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_FAIL,
  BOOK_ASSIGNED_REQUEST,
  BOOK_ASSIGNED_SUCCESS,
  BOOK_ASSIGNED_FAIL,
  BOOK_RETURN_SUCCESS,
  BOOK_RETURN_FAIL,
  BOOK_HISTORY_REQUEST,
  BOOK_HISTORY_SUCCESS,
  BOOK_HISTORY_FAIL,
  BOOK_COLLECTED_REQUEST,
  BOOK_COLLECTED_SUCCESS,
  BOOK_COLLECTED_FAIL,
} from "../constants/bookConstant";

export const getBooks =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: BOOK_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `https://studentlibrary100.herokuapp.com/api/book/?${search}`
      );
      dispatch({
        type: BOOK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const addBook = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BOOK_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "https://studentlibrary100.herokuapp.com/api/book/add/",
      {},
      config
    );
    dispatch({
      type: ADD_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_BOOK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getBookDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://studentlibrary100.herokuapp.com/api/book/${id}/`,
      config
    );
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `https://studentlibrary100.herokuapp.com/api/book/update/${book.id}/`,
      book,
      config
    );
    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `https://studentlibrary100.herokuapp.com/api/book/delete/${id}/`,
      config
    );
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const assignBook = (studentId, bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_ASSIGNED_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `https://studentlibrary100.herokuapp.com/api/book/collect/${studentId}/`,
      {
        bookId: bookId,
      },
      config
    );
    dispatch({
      type: BOOK_ASSIGNED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_ASSIGNED_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const returnBook = (collectedBookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_ASSIGNED_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `https://studentlibrary100.herokuapp.com/api/book/return-book/${collectedBookId}/`,
      config
    );
    dispatch({
      type: BOOK_RETURN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_RETURN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const bookHistory = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_HISTORY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://studentlibrary100.herokuapp.com/api/book/history/${bookId}/`,
      config
    );
    dispatch({
      type: BOOK_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_HISTORY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const booksCollected = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_COLLECTED_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://studentlibrary100.herokuapp.com/api/book/collected-books/`,
      config
    );
    dispatch({
      type: BOOK_COLLECTED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_COLLECTED_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
