import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/authentication/Login";
// import Register from "./pages/authentication/Register";
import ResetPass from "./pages/authentication/reset_password/ResetPass";
import VerifyResetPass from "./pages/authentication/reset_password/VerifyResetPass";
import SetNewPass from "./pages/authentication/reset_password/SetNewPass";
import AsideBar from "./components/AsideBar";
import ErrorPage from "./pages/ErrorPage";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import Profile from "./pages/users/Profile";
import Home from "./pages/Home";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageClasses from "./pages/admin/ManageClasses";
import ClassDetail from "./pages/admin/ClassDetail";
import { isAdmin, isUser, isLogged, isNotLogged } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          {/* <Route
            path="/register"
            element={isNotLogged() ? <Register /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/login"
            element={isNotLogged() ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-email"
            element={isNotLogged() ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password"
            element={isNotLogged() ? <ResetPass /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-reset-pass"
            element={isNotLogged() ? <VerifyResetPass /> : <Navigate to="/" />}
          />

          <Route
            path="/set-new-password"
            element={isNotLogged() ? <SetNewPass /> : <Navigate to="/" />}
          />

          {/* Middle ware */}
          <Route element={<AsideBar />}>
            <Route
              path="/Home"
              element={
                isLogged() && (isAdmin() || isUser()) ? (
                  <Home />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Admin Router */}
            <Route
              path="/"
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
              path="/manage-classes"
              element={
                isLogged() && isAdmin() ? (
                  <ManageClasses />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/class-detail/:classId"
              element={
                isLogged() && isAdmin() ? (
                  <ClassDetail />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* User Router */}
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
