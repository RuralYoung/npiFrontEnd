import './App.css';
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>NPI Registry Search</h1>

        <SearchForm/>
      </div>
    </div>
  );
}

export default App;