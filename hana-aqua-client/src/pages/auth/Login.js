import {Link, useNavigate} from "react-router-dom";
import apiInstance from "../../configs/api";
import {useState} from "react";
import Swal from "sweetalert2";
import {ExclamationCircleIcon} from "@heroicons/react/outline";
import {userLogin} from "../../store/reducers/root";
import {useDispatch} from "react-redux";
import "../styles.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const changeValue = (e) => {
    setErrors({
      email: "",
      password: "",
    });
    const {name, value} = e.target;
    setLoginForm({...loginForm, [name]: value});
  };
  const onLogin = async (e) => {
    try {
      e.preventDefault();
      const {data: login} = await apiInstance.post("/users/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      if (login.role === "admin") {
        await dispatch(userLogin(login));
        navigate("/");
        Swal.fire({
          title: "Login Successful",
          icon: "success",
        });
      } else {
        setErrors({...errors, email: "Invalid Email"});
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        const error = err.response.data.error;
        if (error === "Email or Password is Required") {
          Swal.fire({
            title: "Login Failed",
            icon: "error",
            text: error,
          });
        } else if (
          error.split(" ").find((el) => el.toLowerCase() === "email")
        ) {
          setErrors({...errors, email: error});
        } else if (
          error.split(" ").find((el) => el.toLowerCase() === "password")
        ) {
          setErrors({...errors, password: error});
        }
      }
    }
  };
  return (
    <div className="flex flex-col bg-blue-900 justify-center items-center h-screen">
      <h1 className=" text-5xl font-semibold text-white font-logo">
        Login to Hana Aqua
      </h1>
      <form className="mt-4 space-y-6">
        <div className="w-96">
          <div>
            <label
              htmlFor="email-address"
              className=" text-lg font-semibold text-white"
            >
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Masukkan email"
              onChange={(e) => changeValue(e)}
            />
            {errors.email && (
              <div className="flex flex-row items-center space-x-1 w-screen my-1">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                <p className="text-sm text-yellow-400 font-medium">
                  {errors.email}
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className=" text-lg font-semibold text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Masukkan password"
              onChange={(e) => changeValue(e)}
            />
            {errors.password && (
              <div className="flex flex-row items-center space-x-1 w-screen my-1">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                <p className="text-sm text-yellow-400 font-medium">
                  {errors.password}
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md hover:text-blue-900 hover:bg-white border-white bg-blue-900 text-white border-2"
          onClick={onLogin}
        >
          Login
        </button>
      </form>
      <div className="flex flex-row space-x-1 mt-2">
        <p className="text-white">Tidak punya akun?</p>
        <Link
          to="/register"
          className="text-white underline underline-offset-2"
        >
          klik di sini
        </Link>
        <p className="text-white">untuk mendaftar.</p>
      </div>
    </div>
  );
}
