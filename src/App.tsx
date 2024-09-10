import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PersonalSkillPage from './components/PersonalSkillPage';
import './App.css';
import SongRankingPage from './components/SongRankingPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personal-skill/:userName" element={<PersonalSkillPage />} />
          <Route path="/song-ranking" element={<SongRankingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
