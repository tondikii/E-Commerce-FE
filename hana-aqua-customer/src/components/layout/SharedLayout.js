import { Outlet } from "react-router-dom";
import Navbar from "../navigator/Navbar";
const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
