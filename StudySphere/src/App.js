import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StatsProvider } from './contexts/StatsContext';
import Navbar from './components/layout/Navbar';
import Profile from './components/pages/Profile';
import Dashboard from './components/pages/Dashboard';
import StudyDungeon from './components/features/StudyDungeon';
import StudyMaterials from './components/features/StudyMaterials';
import Flashcards from './components/features/Flashcards';
import Forum from './components/features/Forum';
import Social from './components/features/Social';
import Quests from './components/features/Quests';
import Achievements from './components/features/Achievements';
import RankAssessment from './components/features/RankAssessment';
import AuthForm from './components/auth/AuthForm';
import CharacterCreation from './components/auth/CharacterCreation';
import AiTutor from './components/features/AiTutor';
import Analytics from './components/features/Analytics';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAAFF',
    },
    secondary: {
      main: '#FF4C4C',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading, isNewUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (isNewUser) {
    return <Navigate to="/character-creation" />;
  }

  return children;
};

const CharacterCreationRoute = ({ children }) => {
  const { user, loading, isNewUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (!isNewUser) {
    return <Navigate to="/" />;
  }

  return children;
};

// Placeholder components for missing features
const PlaceholderComponent = ({ title }) => (
  <div style={{ 
    padding: '20px', 
    color: '#4CAAFF',
    textAlign: 'center',
    marginTop: '20px',
  }}>
    <h2>{title}</h2>
    <p>This feature is coming soon...</p>
  </div>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <StatsProvider>
          <Router>
            <div className="App" style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
              <Routes>
                <Route path="/auth" element={<AuthForm />} />
                <Route
                  path="/character-creation"
                  element={
                    <CharacterCreationRoute>
                      <CharacterCreation />
                    </CharacterCreationRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Profile />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Dashboard />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/study-dungeon"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <StudyDungeon />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/study-materials"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <StudyMaterials />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/flashcards"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Flashcards />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/forum"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Forum />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/social"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Social />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ai-tutor"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <AiTutor />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Analytics />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/rank-assessment"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <RankAssessment />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/quests"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <PlaceholderComponent title="Quests" />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/achievements"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Achievements />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <>
                        <Navbar />
                        <Profile />
                      </>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </StatsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
