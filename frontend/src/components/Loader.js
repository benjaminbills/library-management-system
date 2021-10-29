import React from "react";
import classes from "./Loader.module.css";
function Loader() {
  return (
    <div className={classes.container}>
      <div className={(classes.three, classes.col)}>
        <div class={classes.loader} id={classes.loader5}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
