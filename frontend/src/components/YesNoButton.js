import React from "react";
import classes from "./Loader.module.css";

function YesNoButton() {
  return (
    <td>
      <input type="checkbox" name="name" data-onoff="toggle" />
    </td>
  );
}

export default YesNoButton;
