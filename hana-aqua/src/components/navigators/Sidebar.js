import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate();

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
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex flex-col bg-blue-900 w-72 py-6 px-8 h-screen rounded-r-xl fixed">
      <div className="">
        <Link to="/" className=" text-2xl text-white font-bold font-mono">
          Hana Aqua
        </Link>
      </div>
      <div>
        <span
          className="text-white text-lg font-semibold font-mono"
          role="button"
          onClick={onLogout}
        >
          logout
        </span>
      </div>
    </div>
  );
}
