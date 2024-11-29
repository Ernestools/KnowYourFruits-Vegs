import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Quiz from './components/quiz/Quiz';
import CameraAccess from './components/login/CameraAccess';
import Signup from './components/registration/Registration';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Quiz/>} />
          <Route path="/login" element={<CameraAccess/>} />
          <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
