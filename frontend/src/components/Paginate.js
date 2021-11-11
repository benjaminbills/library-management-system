import React from "react";
import { Link } from "react-router-dom";

function Paginate({ pages, page, search }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>

        {[...Array(pages).keys()].map((x) => (
          <li className={`page-item active=${x + 1 === page}`}>
            <Link
              className="page-link"
              key={x + 1}
              to={`/students/?search=${search}&page=${x + 1}`}
            >
              {x + 1}
            </Link>
          </li>
        ))}

        <li className="page-item">
          <Link className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Paginate;
