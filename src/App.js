import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './components/NavBar';
import About from './pages/About';
import Library from './pages/Library';
import Welcome from './pages/Welcome';


function App() {
  return (
    <div className="App">
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element= {<Welcome/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Library' element={<Library/>}/>

      </Routes>

    </Router>
    </div>
  );
}

export default App;
