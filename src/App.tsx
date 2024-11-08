import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import PersonalSkillPage from './components/personalskillpage/PersonalSkillPage';
import './App.css';
import SongRankingPage from './components/SongRankingPage';
import HomePage from './components/HomePage';
import useWindowSize from './util/UseWindowSize';
import SupportUsPage from './components/supportus/SupportUsPage';
import SongDetailPage from './components/songdetail/SongDetailPage';
import ScrollToTop from './components/ScrollToTopButton';

function App() {

  const { width } = useWindowSize();
  const isMobile = width < 768; // md breakpoint in Tailwind

  return (
    <Router>
      <div className={`App ${isMobile ? 'm-0 p-0 w-full' : 'mx-auto px-4 py-8'}`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personal-skill/:userName" element={<PersonalSkillPage />} />
          <Route path="/song-ranking" element={<SongRankingPage />} />
          <Route
            path="/song-ranking/:grade"
            element={<Navigate to="/song-ranking" replace />}
          />
          <Route path="/song-detail/:songId/:chartType" element={<SongDetailPage />} />
          <Route path="/support-us" element={<SupportUsPage />} />
        </Routes>

        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App
