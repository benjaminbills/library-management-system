import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../actions/userActions";
import { useHistory, useLocation } from "react-router-dom";

function Paginate({ pages, page, search }) {
  const dispatch = useDispatch();
  const changePageHandler = (page) => {
    console.log(`${search}&page=${page}`);
    dispatch(getUsers(`${search}&page=${page}`));
  };
  const previousHandler = () => {
    if (page > 1) {
      dispatch(getUsers(`${search}&page=${page - 1}`));
    } else {
      dispatch(getUsers(`${search}&page=1`));
    }
  };
  const nextHandler = () => {
    if (page < pages) {
      dispatch(getUsers(`${search}&page=${page + 1}`));
    } else {
      dispatch(getUsers(`${search}&page=${pages}`));
    }
  };
  let conditionStyle = "page-item";
  return (
    pages > 1 && (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={previousHandler}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {[...Array(pages).keys()].map((x) => (
            <li
              className={
                x + 1 !== page ? conditionStyle : `${conditionStyle} active`
              }
              key={x + 1}
            >
              <button
                className="page-link"
                onClick={(e) => changePageHandler(x + 1)}
              >
                {x + 1}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link"
              onClick={nextHandler}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Paginate;
