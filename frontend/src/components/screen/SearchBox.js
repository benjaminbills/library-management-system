import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { getBooks } from "../../actions/bookActions";

function SearchBox(props) {
  const authorRef = useRef("");
  const titleRef = useRef("");
  const dispatch = useDispatch();
  const listenHandler = (e) => {
    e.preventDefault();
    dispatch(getBooks(`title=${titleRef.current.value}`));
  };
  return (
    <div>
      <form onChange={listenHandler}>
        <input
          className="form-control"
          placeholder={props.placename}
          ref={titleRef}
        />
      </form>
    </div>
  );
}

export default SearchBox;
