import React, { useState } from "react";
import './App.css';


function App() {
  const [backendData, setBackendData] = useState([]);
  const [city, setCity] = useState([]);
  const [skip, setSkip] = useState(0);

  async function fetchData() {
    const response = await window.fetch(`http://localhost:5000/?&city=${city}&skip=${skip}`);
    const data = await response.json();
    setBackendData(data);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setCity(formData.get("myCity"));

    fetchData();
  }

  const fetchMore = event => {
    event.preventDefault();
    setSkip(skip=> skip+200);

    fetchData();
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
          <thead>
            <tr>
              <th>Name</th>
              <th>NPI</th>
              <th>Primary Address</th>
            </tr>
          </thead>
          {/*We have to do the '?' as it asks if it exists first*/}
          <tbody>
            {backendData.results?.map((item, index) => (
              <tr key={index}>
                <td>{item.basic.organization_name}</td>
                <td>{item.number}</td>
                <td>{item.addresses[1].address_1} {item.addresses[1].city}, {item.addresses[1].state} {item.addresses[1].postal_code.slice(0,5)}-{item.addresses[1].postal_code.slice(5,9)} {item.addresses[1].country_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

          <button onClick={fetchMore} >load more</button>
      </div>
    </div>
  );
}

export default App;