import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StatsProvider } from './contexts/StatsContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { StudyDungeonProvider } from './contexts/StudyDungeonContext';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import CookieConsent from './components/CookieConsent/CookieConsent';
import { HelmetProvider } from 'react-helmet-async';
import { Box, CircularProgress } from '@mui/material';
import ProfileBoard from './components/ProfileBoard';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Profile = lazy(() => import('./components/pages/Profile'));
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const AuthForm = lazy(() => import('./components/auth/AuthForm'));
const CharacterCreation = lazy(() => import('./components/auth/CharacterCreation'));
const Flashcards = lazy(() => import('./components/pages/Flashcards'));
const Social = lazy(() => import('./components/pages/Social'));
const AITutor = lazy(() => import('./components/pages/AITutor'));
const StudyDungeon = lazy(() => import('./components/pages/StudyDungeon'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Teacher pages
const TeacherClasses = lazy(() => import('./pages/teacher/Classes'));
const TeacherContent = lazy(() => import('./pages/teacher/Content'));
const TeacherAnalytics = lazy(() => import('./pages/teacher/Analytics'));
const TeacherEngagement = lazy(() => import('./pages/teacher/Engagement'));
const TeacherLessonPlanning = lazy(() => import('./pages/teacher/LessonPlanning'));
const TeacherAssessments = lazy(() => import('./pages/teacher/Assessments'));
const TeacherParentPortal = lazy(() => import('./pages/teacher/ParentPortal'));
const TeacherResources = lazy(() => import('./pages/teacher/Resources'));

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Layout>
              <Home />
            </Layout>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthForm />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/character-creation",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CharacterCreationRoute>
              <CharacterCreation />
            </CharacterCreationRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <ProfileBoard />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/study-dungeon",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <StudyDungeon />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/ai-tutor",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <AITutor />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/flashcards",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <Flashcards />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/social",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <Social />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Layout>
              <About />
            </Layout>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Layout>
              <Contact />
            </Layout>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teachers",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Layout>
              <Teachers />
            </Layout>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/classes",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherClasses />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/content",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherContent />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/analytics",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherAnalytics />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/engagement",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherEngagement />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/lesson-planning",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherLessonPlanning />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/assessments",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherAssessments />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/parent-portal",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherParentPortal />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/teacher/resources",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute>
              <Layout>
                <TeacherResources />
              </Layout>
            </PrivateRoute>
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <StatsProvider>
            <StudyDungeonProvider>
              <RouterProvider router={router} />
              <CookieConsent />
            </StudyDungeonProvider>
          </StatsProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

// Layout component that includes Navbar and Footer
const Layout = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

// PrivateRoute: Protects routes for authenticated users
const PrivateRoute = ({ children }) => {
  const { user, loading, isNewUser } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  if (isNewUser) return <Navigate to="/character-creation" />;
  return children;
};

// CharacterCreationRoute: Redirects new users to character creation
const CharacterCreationRoute = ({ children }) => {
  const { user, loading, isNewUser } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  if (!isNewUser) return <Navigate to="/" />;
  return children;
};

export default App;
