import axios from "axios";
import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
} from "../constants/bookConstant";

export const getBooks =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: BOOK_LIST_REQUEST,
      });

      const { data } = await axios.get(`api/book/?${search}`);
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
