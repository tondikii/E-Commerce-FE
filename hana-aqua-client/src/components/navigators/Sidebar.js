import {Link, useNavigate, useLocation} from "react-router-dom";
import Swal from "sweetalert2";
import {LogoutIcon, ShoppingBagIcon} from "@heroicons/react/outline";
import UilStore from "@iconscout/react-unicons/icons/uil-store";
import {useDispatch} from "react-redux";
import {userLogout} from "../../store/reducers/root";
import "../styles.css";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logout",
      text: "Apakah kamu yakin ingin logout?",
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
            src="http://trimelive.com/wp-content/uploads/2020/12/gambar-Wa-1.png"
            className="w-12 h-12 rounded-full"
            alt="profil"
          />
          <p className=" text-md text-white font-bold font-sans ml-4">
            {localStorage.fullName}
          </p>
        </div>
        <div className="mb-4">
          <Link to="/">
            <div className="flex flex-row items-center space-x-1 justify-start px-4 py-2">
              <UilStore color="white" size={32} />
              <p className=" text-4xl text-white font-bold font-logo">
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
                Produk
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-1 bg-blue-900 px-4 py-2 rounded-md justify-start">
              <ShoppingBagIcon className="h-7 w-7 text-white font-bold" />
              <p className=" text-xl text-white font-bold font-sans">Produk</p>
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
