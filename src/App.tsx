import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Movies,
  Shows,
  Bookmarked,
  Profile,
  MovieDetails,
  ShowDetails,
  LogIn,
  SignUp,
  ForgotPassword,
} from '@/pages/index';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <SearchContextProvider>
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
                  <ProtectedRoute>
                    <Bookmarked />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="/movie-details/:id"
              element={
                <MainLayout>
                  <MovieDetails />
                </MainLayout>
              }
            />
            <Route
              path="/show-details/:id"
              element={
                <MainLayout>
                  <ShowDetails />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
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
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              }
            />
          </Routes>
        </SearchContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
