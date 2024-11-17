import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Quiz from './components/quiz/Quiz';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Quiz/>} />
      </Routes>
    </Router>
  );
}

export default App;
