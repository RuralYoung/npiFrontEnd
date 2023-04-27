import React from "react";

export default function SearchForm(props) {
  return (
    <form>
      <label>
        State: <input type="text" name="myState"/>
      </label>
      <div>
        <button type="reset">Clear</button>
        <button type="submit">Submit</button> 
      </div>
    </form>
  );
}
