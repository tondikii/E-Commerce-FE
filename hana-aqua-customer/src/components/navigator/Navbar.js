import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Disclosure } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { FilterIcon, XIcon, SearchIcon } from "@heroicons/react/outline";
import { useParams, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const queryRef = useRef(null); // Reference to the input;
  const isSearched = query?.split("&").find((el) => el[0] === "s") || undefined;
  const [searchForm, setSearchForm] = useState(
    `${isSearched ? isSearched.split("=")[1] : ""}`
  );
  const navigation = [
    {
      name: "Tanks",
      href: `/${
        query
          ? `${query
              .split("&")
              .filter((el) => el[0] !== "c")
              .join("").length > 0 ? "&" : ""}`
          : ""
      }category=1`,
      current:
        query === "category=1" ||
        query?.split("&").find((el) => el === "category=1") !== undefined
          ? true
          : false,
    },
    {
      name: "Ponds",
      href: `/${
        query
          ? `${query
              .split("&")
              .filter((el) => el[0] !== "c")
              .join("").length > 0 ? "&" : ""}`
          : ""
      }category=2`,
      current:
        query === "category=2" ||
        query?.split("&").find((el) => el === "category=2") !== undefined
          ? true
          : false,
    },
  ];

  const onSearch = async (e) => {
    await e.preventDefault();
    console.log("SEARCHING");
    if (query) {
      console.log("ADA QUERY");
      const newQuery = query
        .split("&")
        .filter((el) => el[0] !== "s")
        .join("");
      navigate(
        `/${newQuery + `${newQuery.length > 0 ? "&" : ""}search=${searchForm}`}`
      );
    } else {
      console.log("TIDAK ADA QUERY");
      navigate(`/search=${searchForm}`);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-blue-900 sticky top-0">
      {({ open }) => (
        <div className="space-x-2 items-center">
          <nav className="p-2 md:p-4 flex space-x-2 flex-row justify-between items-center md:px-4 lg:px-12">
            <div className="flex flex-row justify-center items-center">
              <NavLink
                to="/"
                className={({isActive}) =>  (isActive ? "bg-white text-blue-900  text-xs font-bold p-2 md:text-xl lg:text-2xl xl:text-3xl rounded-md" : "text-white text-xs font-bold p-2 md:text-xl lg:text-2xl xl:text-3xl")}
              >
                Hana Aqua
              </NavLink>
              <div className="flex flex-row justify-evenly items-center text-white">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={
                      item.current
                        ? "py-2 px-4 bg-white text-blue-900 xl:text-2xl md:text-lg lg:text-xl hidden sm:flex font-bold rounded-md"
                        : "py-2 px-4 xl:text-2xl md:text-lg lg:text-xl hidden sm:flex font-bold"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <form onSubmit={onSearch} className="flex flex-row">
              <button type="submit">
                <SearchIcon className="block h-8 w-8 bg-blue-900 text-white p-2 border border-white rounded-sm rounded-r-none md:h-10 md:w-10 lg:h-12 lg:w-12" />
              </button>
              <input
                ref={queryRef}
                type="text"
                placeholder="Cari Produk"
                className="w-48 md:w-72 md:h-10 lg:h-12 lg:w-96 rounded-sm rounded-l-none"
                value={searchForm}
                onChange={(e) => setSearchForm(e.target.value)}
              />
            </form>
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XIcon
                  className="block h-6 w-6 text-white"
                  aria-hidden="true"
                />
              ) : (
                <FilterIcon
                  className="block h-6 w-6 text-white"
                  aria-hidden="true"
                />
              )}
            </Disclosure.Button>
          </nav>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-white text-blue-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
export default Navbar;
