import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/notes" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
