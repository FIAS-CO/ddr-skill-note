import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PersonalSkillPage from './components/PersonalSkillPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<PersonalSkillPage />} />
          <Route path="/personal-skill" element={<PersonalSkillPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
