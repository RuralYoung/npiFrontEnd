import React, { useEffect, useState } from "react";
import './App.css';


function App() {
  const [backendData, setBackendData] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [npiNum, setNpiNum] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [zip, setZip] = useState([]);
  const [skip, setSkip] = useState(0);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() =>{
    fetch(`http://localhost:5000/?&first_name=${firstName}&last_name=${lastName}&number=${npiNum}&city=${city}&state=${state}&postal_code=${zip}&skip=${skip}`)
      .then(response => response.json())
      .then(data => setBackendData(data))
  }, [firstName, lastName, npiNum, city, state, zip, skip]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    setFirstName(formData.get("myFirstName"))
    setLastName(formData.get("myLastName"))
    setCity(formData.get("myCity"));
    setNpiNum(formData.get("myNpiNum"));
    setState(formData.get("myState"));
    setZip(formData.get("myZip"));
    setVisible(true);
  }

  function nextPage() {
    // Since we have a max of 1000 skips
    if (skip < 1000) {
      setSkip(skip => skip + 200)
      setPage(page => page + 1)
    }
  }

  function previousPage() {
    // don't want to go below 0
    if (skip > 0 ) {
      setSkip(skip => skip - 200)
      setPage(page => page - 1)
    }
  }


  return (
    <div className="App">
      <div className="content">
        <h1>NPI Registry Search</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name: <input type="text" name="myFirstName"/>
          </label>
          <label>
            Last Name: <input type="text" name="myLastName"/>
          </label>
          <label>
            NPI Number: <input type="text" name="myNpiNum"/>
          </label>
          <label>
            City: <input type="text" name="myCity"/>
          </label>
          <label>
            State: <input type="text" name="myState"/>
          </label>
          <label>
            Zip: <input type="text" name="myZip"/>
          </label>
          <div>
            <button type="reset">Clear</button>
            <button type="submit">Submit</button> 
          </div>
        </form>

        { visible?
        <div className="results">
          <div>
            { skip !== 0 && visible? <button onClick={previousPage} className="previous">Previous Page</button>:null }
            { visible?<span className="box">Page: {page}</span>:null}
            { skip !== 1000 && visible && backendData.result_count > 50? <button onClick={nextPage} className="next">Next Page</button>:null }
          </div>
        <table className="table">
          <thead>
            <tr>
              <th>NPI</th>
              <th>Organization Name</th>
              <th>Provider's name</th>
              <th>Primary Address</th>
            </tr>
          </thead>
          {/*We have to do the '?' as it asks if it exists first*/}
          <tbody>
            {backendData.results?.map((item, index) => (
              <tr key={index}>
                <td><a href={`https://npiregistry.cms.hhs.gov/provider-view/${item.number}`} target="_blank" rel="noopener noreferrer">{item.number}</a></td>
                <td>{item.basic.organization_name}</td>
                <td>{item.basic.first_name} {item.basic.last_name}</td>
                <td>{item.addresses[1].address_1} {item.addresses[1].city}, {item.addresses[1].state} {item.addresses[1].postal_code.slice(0,5)}-{item.addresses[1].postal_code.slice(5,9)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        : null
        }
      
        {/*Next and Previous Buttons*/}
        <div>
          { skip !== 0 && visible? <button onClick={previousPage} className="previous">Previous Page</button>:null }
          { visible?<span className="box">Page: {page}</span>:null}
          { skip !== 1000 && visible && backendData.result_count > 50? <button onClick={nextPage} className="next">Next Page</button>:null }
        </div>

      </div>
    </div>
  );
}

export default App;