import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Quiz from './components/quiz/Quiz';
import Login from './components/login/Login';
import Signup from './components/registration/Registration';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Quiz/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/quiz" element={<Quiz/>} />
      </Routes>
    </Router>
  );
}

export default App;
