import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import AsideBar from "./components/AsideBar";
import ErrorPage from "./pages/ErrorPage";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Profile from "./pages/users/Profile";
import Home from "./pages/Home";
import ManageUsers from "./pages/admin/ManageUsers";
import { isAdmin, isUser, isLogged, isNotLogged } from "./auth/AuthContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/register"
            element={isNotLogged() ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={isNotLogged() ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-email"
            element={isNotLogged() ? <VerifyEmail /> : <Navigate to="/" />}
          />

          <Route element={<AsideBar />}>
            <Route
              path="/"
              element={
                isLogged() && (isAdmin() || isUser()) ? (
                  <Home />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLogged() && isAdmin() ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/manage-users"
              element={
                isLogged() && isAdmin() ? (
                  <ManageUsers />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isLogged() && (isAdmin() || isUser()) ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
