import React, { useState } from "react";
import './App.css';


function App() {
  const [backendData, setBackendData] = useState([]);

  async function fetchData(event) {
    const formData = new FormData(event.target);

    const response = await window.fetch(`http://localhost:5000/?&city=${formData.get("myCity")}`);
    const data = await response.json();
    setBackendData(data);
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetchData(event)
  }

  return (
    <div className="App">
      <div className="content">
        <h1>NPI Registry Search</h1>

        <form onSubmit={handleSubmit}>
          <label>
            City: <input type="text" name="myCity"/>
          </label>
          <div>
            <button type="reset">Clear</button>
            <button type="submit">Submit</button> 
          </div>
        </form>
        
        <div>
          <h2>Results: {backendData.result_count}</h2>
        </div>

        <table>
          <tr>
            <th>Name</th>
            <th>NPI</th>
            <th>Primary Address</th>
          </tr>
          {/*We have to do the '?' as it asks if it exists first*/}
          {backendData.results?.map((item, index) => (
            <tr key={index}>
              <td>{item.basic.organization_name}</td>
              <td>{item.number}</td>
              <td>{item.addresses[1].address_1} {item.addresses[1].city}, {item.addresses[1].state} {item.addresses[1].postal_code.slice(0,5)}-{item.addresses[1].postal_code.slice(5,9)} {item.addresses[1].country_name}</td>
            </tr>
          ))}
          </table>
      </div>
    </div>
  );
}

export default App;