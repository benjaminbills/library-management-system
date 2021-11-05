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
} from "../constants/bookConstant";

export const getBooks =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: BOOK_LIST_REQUEST,
      });

      const { data } = await axios.get(`api/book/?${search}&page=1`);
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
    const { data } = await axios.post("api/book/add/", {}, config);
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

export const getBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_DETAILS_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(`api/book/${id}/`, config);
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

export const updateBook = (book) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      `api/book/update/${book.id}/`,
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

export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.delete(`api/book/delete/${id}/`, config);
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

export const assignBook = (studentId, bookId) => async (dispatch) => {
  try {
    dispatch({
      type: BOOK_ASSIGNED_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `api/book/collect/${studentId}/`,
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
