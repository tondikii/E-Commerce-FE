import "./App.css";
// import { StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/auth/Login";
import ErrorNotFound from "./pages/errors/NotFound";
import RegisterPage from "./pages/auth/Register";
// import store from "./store";
// import ReactDOM from 'react-dom'
// import { Provider } from "react-redux";
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
