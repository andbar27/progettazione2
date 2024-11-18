import logo from './logo.svg';
import './App.css';
import Example1 from './examples/example1';
import Francisco from './examples/example1';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cacato nel puzzo
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React? Capiamo
        </a>
      </header>
      <Francisco/>
    </div>
  );
}

export default App;
