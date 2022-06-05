import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/main/Home";
import ErrorNotFound from "./pages/errors/NotFound";
import ProductDetail from "./pages/product/Detail";
import SharedLayout from "./components/layout/SharedLayout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

function App() {
  // const ProtectedRoute = ({ children }) => {
  //   if (!localStorage.access_token) return <Navigate to="/login" />;
  //   else return children;
  // };
  const UnprotectedRoute = ({ children }) => {
    if (localStorage.access_token) return <Navigate to="/" />;
    else return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route
            path="login"
            element={
              <UnprotectedRoute>
                <LoginPage />
              </UnprotectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <UnprotectedRoute>
                <RegisterPage />
              </UnprotectedRoute>
            }
          />
          <Route path="*" element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
