import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
