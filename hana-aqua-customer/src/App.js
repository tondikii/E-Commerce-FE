import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/main/Home";
import ErrorNotFound from "./pages/errors/NotFound";
import ProductDetail from "./pages/product/Detail";
import SharedLayout from "./components/layout/SharedLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:query" element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
