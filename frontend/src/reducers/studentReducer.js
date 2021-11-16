import {
  STUDENT_LIST_FAIL,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_PROFILE_FAIL,
  STUDENT_PROFILE_REQUEST,
  STUDENT_PROFILE_RESET,
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_UPDATE_FAIL,
  STUDENT_PROFILE_UPDATE_REQUEST,
  STUDENT_PROFILE_UPDATE_RESET,
  STUDENT_PROFILE_UPDATE_SUCCESS,
  STUDENT_RESGISTER_FAIL,
  STUDENT_RESGISTER_REQUEST,
  STUDENT_RESGISTER_RESET,
  STUDENT_RESGISTER_SUCCESS,
} from "../constants/studentConstant";

export const studentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { loading: true, students: [] };
    case STUDENT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        students: action.payload.students,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentRegisterReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_RESGISTER_REQUEST:
      return { loading: true, success: false };
    case STUDENT_RESGISTER_SUCCESS:
      return { loading: false, success: true, studentInfo: action.payload };
    case STUDENT_RESGISTER_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_RESGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const studentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_PROFILE_REQUEST:
      return { loading: true };
    case STUDENT_PROFILE_SUCCESS:
      return { loading: false, student: action.payload };
    case STUDENT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const studentUpdateProfileReducer = (
  state = { student: {} },
  action
) => {
  switch (action.type) {
    case STUDENT_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case STUDENT_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case STUDENT_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
