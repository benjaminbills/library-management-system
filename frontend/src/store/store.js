import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  studentRegisterReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
} from "../reducers/userReducers";
import {
  addBookReducer,
  bookAssignReducer,
  BookDeleteReducer,
  BookDetailsReducer,
  bookHistoryReducer,
  bookListReducer,
  BookUpdateReducer,
  returnBookReducer,
} from "../reducers/bookReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  bookList: bookListReducer,
  addBook: addBookReducer,
  bookDetails: BookDetailsReducer,
  bookUpdate: BookUpdateReducer,
  bookDelete: BookDeleteReducer,
  studentRegister: studentRegisterReducer,
  userList: userListReducer,
  bookAssign: bookAssignReducer,
  bookReturn: returnBookReducer,
  historyOfBook: bookHistoryReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
