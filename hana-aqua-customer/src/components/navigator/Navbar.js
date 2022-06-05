import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const onLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logout",
      text: "Are you sure want to logout?",
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      showDenyButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.clear();
      }
    });
  };

  return (
    <nav className="p-4 bg-blue-900 space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-900 text-xl font-bold bg-white p-2 rounded-md"
            : "text-white text-xl font-bold p-2"
        }
      >
        Hana Aqua
      </NavLink>
      {localStorage.access_token ? (
        <span onClick={onLogout} className="text-white text-xl font-bold p-2">
          Logout
        </span>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-blue-900 text-xl font-bold bg-white p-2 rounded-md"
                : "text-white text-xl font-bold p-2"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-blue-900 text-xl font-bold bg-white p-2 rounded-md"
                : "text-white text-xl font-bold p-2"
            }
          >
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
};
export default Navbar;
