import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Movies, Shows, Bookmarked, LogIn, SignUp } from '@/pages/index';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/movies"
            element={
              <MainLayout>
                <Movies />
              </MainLayout>
            }
          />
          <Route
            path="/shows"
            element={
              <MainLayout>
                <Shows />
              </MainLayout>
            }
          />
          <Route
            path="/bookmarked"
            element={
              <MainLayout>
                <Bookmarked />
              </MainLayout>
            }
          />
          <Route
            path="/log-in"
            element={
              <AuthLayout>
                <LogIn />
              </AuthLayout>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
