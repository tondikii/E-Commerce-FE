import { Outlet } from "react-router-dom";
import Footer from "../navigator/Footer";
import Navbar from "../navigator/Navbar";
const SharedLayout = () => {
  return (
    <div className="flex flex-1 flex-col min-h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default SharedLayout;
