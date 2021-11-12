import React from "react";

function Paginate({ pages, page, onChangePage, nextPage, previousPage }) {
  const changePageHandler = (p) => {
    onChangePage(p);
  };
  const previousHandler = () => {
    previousPage();
  };
  const nextHandler = () => {
    nextPage();
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
