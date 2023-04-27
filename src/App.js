import React, { useEffect, useState } from "react";
import './App.css';


function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch("http://localhost:5000/");
      const data = await response.json();
      setBackendData(data);
    })();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <h1>NPI Registry Search</h1>

        <form>
          <label>
            City: <input type="text" name="myCity"/>
          </label>
          <div>
            <button type="reset">Clear</button>
            <button type="submit">Submit</button> 
          </div>
        </form>
        
        <div>
          {backendData.result_count}
        </div>
      </div>
    </div>
  );
}

export default App;