import React, { useEffect, useState } from "react";
import './App.css';


function App() {
  const [backendData, setBackendData] = useState([]);
  const [city, setCity] = useState([]);
  const [skip, setSkip] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() =>{
    fetch(`http://localhost:5000/?&city=${city}&skip=${skip}`)
      .then(response => response.json())
      .then(data => setBackendData(data))
  }, [city, skip]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    setCity(formData.get("myCity"));
    setVisible(true);
  }

  function nextPage() {
    // Since we have a max of 1000 skips
    if (skip < 1000) {
      setSkip(skip => skip + 200)
    }
  }

  function previousPage() {
    // don't want to go below 0
    if (skip > 0 ) {
      setSkip(skip => skip - 200)
    }
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

        { visible?
        <table>
          <thead>
            <tr>
              <th>NPI</th>
              <th>Name</th>
              <th>Primary Address</th>
            </tr>
          </thead>
          {/*We have to do the '?' as it asks if it exists first*/}
          <tbody>
            {backendData.results?.map((item, index) => (
              <tr key={index}>
                <td><a href={`https://npiregistry.cms.hhs.gov/provider-view/${item.number}`} target="_blank" rel="noopener noreferrer">{item.number}</a></td>
                <td>{item.basic.organization_name}</td>
                <td>{item.addresses[1].address_1} {item.addresses[1].city}, {item.addresses[1].state} {item.addresses[1].postal_code.slice(0,5)}-{item.addresses[1].postal_code.slice(5,9)} {item.addresses[1].country_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : null
        }

        <div>
          { skip !== 0 && visible? <button onClick={previousPage}>Previous Page</button>:null }
          { skip !== 1000 && visible? <button onClick={nextPage}>Next Page</button>:null }
        </div>
      </div>
    </div>
  );
}

export default App;