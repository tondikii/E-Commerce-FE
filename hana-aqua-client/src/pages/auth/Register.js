import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../../configs/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/reducers/root";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({
    fullName: [],
    email: [],
    password: [],
    phoneNumber: [],
  });
  const changeValue = (e) => {
    setErrors({
      fullName: [],
      email: [],
      password: [],
      phoneNumber: [],
    });
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const onRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await apiInstance.post("/users/register", registerForm);
      if (data?.user) {
        const { data: login } = await apiInstance.post("/users/login", {
          email: registerForm.email,
          password: registerForm.password,
        });
        await dispatch(userLogin(login));
        navigate("/");
        Swal.fire({
          title: "Register Successful",
          icon: "success",
        });
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        const error = err.response.data.error;
        error.forEach((each) => {
          if (
            each.split(" ").find((el) => el.toLowerCase() === "password") !==
            undefined
          )
            setErrors({ ...errors, password: errors.password.push(each) });
          else if (
            each.split(" ").find((el) => el.toLowerCase() === "name") !==
            undefined
          )
            setErrors({ ...errors, fullName: errors.fullName.push(each) });
          else if (
            each.split(" ").find((el) => el.toLowerCase() === "email") !==
            undefined
          )
            setErrors({ ...errors, email: errors.email.push(each) });
          else if (
            each.split(" ").find((el) => el.toLowerCase() === "number") !==
            undefined
          ) {
            setErrors({
              ...errors,
              phoneNumber: errors.phoneNumber.push(each),
            });
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col bg-blue-900 justify-center items-center h-screen">
      <h1 className=" text-4xl font-semibold text-white font-mono">
        Register to Hana Aqua
      </h1>
      <form className="mt-4 space-y-6">
        <div className="w-96">
          <div>
            <label
              htmlFor="fullName"
              className=" text-lg font-semibold text-white"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
              onChange={(e) => changeValue(e)}
            />
            {errors.fullName.length > 0 &&
              errors.fullName.map((err) => (
                <div className="flex flex-row items-center space-x-1 w-screen my-1">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                  <p className="text-sm text-yellow-400 font-medium">{err}</p>
                </div>
              ))}
          </div>
          <div>
            <label
              htmlFor="email-address"
              className=" text-lg font-semibold text-white"
            >
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => changeValue(e)}
            />
            {errors.email.length > 0 &&
              errors.email.map((err) => (
                <div className="flex flex-row items-center space-x-1 w-screen my-1">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                  <p className="text-sm text-yellow-400 font-medium">{err}</p>
                </div>
              ))}
            {errors.email === 1 && (
              <div className="flex flex-row items-center space-x-1 w-screen my-1">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                <p className="text-sm text-yellow-400 font-medium">
                  Email already exist
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
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => changeValue(e)}
            />
            {errors.password.length > 0 &&
              errors.password.map((err) => (
                <div className="flex flex-row items-center space-x-1 w-screen my-1">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                  <p className="text-sm text-yellow-400 font-medium">{err}</p>
                </div>
              ))}
            {errors.password === 1 && (
              <div className="flex flex-row items-center space-x-1 w-screen my-1">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                <p className="text-sm text-yellow-400 font-medium">
                  Password should be more than equal 6 characters
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className=" text-lg font-semibold text-white"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Phone Number"
              onChange={(e) => changeValue(e)}
            />
            {errors.phoneNumber.length > 0 &&
              errors.phoneNumber.map((err) => (
                <div className="flex flex-row items-center space-x-1 w-screen my-1">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                  <p className="text-sm text-yellow-400 font-medium">{err}</p>
                </div>
              ))}
            {errors.phoneNumber === 1 && (
              <div className="flex flex-row items-center space-x-1 w-screen my-1">
                <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 font-bold" />
                <p className="text-sm text-yellow-400 font-medium">
                  Phone Number cannot be empty
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md hover:text-blue-900 hover:bg-white border-white bg-blue-900 text-white"
          onClick={onRegister}
        >
          Register
        </button>
      </form>
      <div className="flex flex-row space-x-1 mt-2">
        <p className="text-white">Already have an account?</p>
        <Link to="/login" className="text-white underline underline-offset-2">
          click here
        </Link>
        <p className="text-white">to login</p>
      </div>
    </div>
  );
}
