import axios from "axios";
import {
  STUDENT_LIST_FAIL,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_PROFILE_FAIL,
  STUDENT_PROFILE_REQUEST,
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_UPDATE_FAIL,
  STUDENT_PROFILE_UPDATE_REQUEST,
  STUDENT_PROFILE_UPDATE_SUCCESS,
  STUDENT_RESGISTER_FAIL,
  STUDENT_RESGISTER_REQUEST,
  STUDENT_RESGISTER_SUCCESS,
  STUDENT_UPLOAD_FAIL,
  STUDENT_UPLOAD_REQUEST,
  STUDENT_UPLOAD_SUCCESS,
} from "../constants/studentConstant";

export const uploadStudent = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPLOAD_REQUEST,
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
      type: STUDENT_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getStudents =
  (search = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: STUDENT_LIST_REQUEST });
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
        `https://studentlibrary100.herokuapp.com/api/student/?${search}`,
        config
      );
      console.log(data);
      dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: STUDENT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const registerStudent =
  (name, admission_num, class_detail, phone) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_RESGISTER_REQUEST,
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
        "https://studentlibrary100.herokuapp.com/api/student/register/",
        {
          name: name,
          admission_num: admission_num,
          class_detail: class_detail,
          phone: phone,
        },
        config
      );
      dispatch({
        type: STUDENT_RESGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_RESGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getStudentProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_PROFILE_REQUEST });
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
      `https://studentlibrary100.herokuapp.com/api/student/${id}/`,
      config
    );
    dispatch({ type: STUDENT_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateStudentProfile =
  (name, classDetail, studentAdmissionNum, phone, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_PROFILE_UPDATE_REQUEST,
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
        `https://studentlibrary100.herokuapp.com/api/student/profile/update/${id}/`,
        {
          name: name,
          class_detail: classDetail,
          admission_num: studentAdmissionNum,
          phone: phone,
        },
        config
      );
      dispatch({
        type: STUDENT_PROFILE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENT_PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
