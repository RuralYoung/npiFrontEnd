import React from "react";
import HandleSubmit from "./HandleSubmit";

export default function SearchForm(props) {
  return (
    <form onSubmit={HandleSubmit}>
      <label>
        City: <input type="text" name="myCity"/>
      </label>
      <div>
        <button type="reset">Clear</button>
        <button type="submit">Submit</button> 
      </div>
    </form>
  );
}
