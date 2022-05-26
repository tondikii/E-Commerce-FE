import "./App.css";
// import { StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import ErrorNotFound from "./pages/errors/NotFound";
import RegisterPage from "./pages/auth/Register";
import HomePage from "./pages/main/Home";
import CreatePage from "./pages/main/Create";
import EditPage from "./pages/main/Edit";

function App() {
  const RequiredLogin = ({ children }) => {
    if (!localStorage.access_token) {
      return <Navigate to="/Login" />;
    } else return children;
  };
  const ForbiddenLogin = ({ children }) => {
    if (localStorage.access_token) {
      return <Navigate to="/" />;
    } else return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredLogin>
              <HomePage />
            </RequiredLogin>
          }
        />
        <Route
          path="/create"
          element={
            <RequiredLogin>
              <CreatePage />
            </RequiredLogin>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RequiredLogin>
              <EditPage />
            </RequiredLogin>
          }
        />
        <Route
          path="/login"
          element={
            <ForbiddenLogin>
              <LoginPage />
            </ForbiddenLogin>
          }
        />
        <Route
          path="/register"
          element={
            <ForbiddenLogin>
              <RegisterPage />
            </ForbiddenLogin>
          }
        />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
