import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { LogoutIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import UilStore from "@iconscout/react-unicons/icons/uil-store";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/reducers/root";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
        dispatch(userLogout());
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex flex-col bg-blue-900 w-64 py-6 px-8 h-screen rounded-r-xl fixed justify-between items-center">
      <div className="flex flex-col">
        <div className="flex flex-row items-center px-4 py-2 pb-4">
          <img
            // src="http://trimelive.com/wp-content/uploads/2020/12/gambar-Wa-1.png"
            src="data:image/png;base64,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"
            className="w-12 h-12 rounded-full"
          />
          <p className=" text-md text-white font-bold font-sans ml-4">
            {localStorage.fullName}
          </p>
        </div>
        <div className="mb-4">
          <Link to="/">
            <div className="flex flex-row items-center space-x-1 justify-start px-4 py-2">
              <UilStore color="white" size={32} />
              <p className=" text-2xl text-white font-bold font-sans">
                Hana Aqua
              </p>
            </div>
          </Link>
        </div>
        <Link to="/">
          {location.pathname === "/" ||
          location.pathname === "/create" ||
          location.pathname.split("/")[1] === "edit" ? (
            <div className="flex flex-row items-center space-x-1 bg-white px-4 py-2 rounded-md justify-start">
              <ShoppingBagIcon className="h-7 w-7 text-blue-900 font-bold" />
              <p className=" text-xl text-blue-900 font-bold font-sans">
                Product
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-1 bg-blue-900 px-4 py-2 rounded-md justify-start">
              <ShoppingBagIcon className="h-7 w-7 text-white font-bold" />
              <p className=" text-xl text-white font-bold font-sans">Product</p>
            </div>
          )}
        </Link>
      </div>
      <div
        className="flex flex-row items-center space-x-1 justify-start px-4 py-2"
        role="button"
        onClick={onLogout}
      >
        <LogoutIcon className="h-7 w-7 text-white font-bold" />
        <span
          className="text-white text-lg font-semibold font-sans"
          role="button"
        >
          logout
        </span>
      </div>
    </div>
  );
}
