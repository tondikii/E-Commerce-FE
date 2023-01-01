import { OfficeBuildingIcon, PhoneIcon } from "@heroicons/react/outline";

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row relative bg-blue-900 bottom-0 w-full justify-start items-center mt-4 md:h-48 lg:h-52 h-32 py-2">
      <div className="w-full md:w-1/2">
        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold text-center">
          Hana Aqua
        </h1>
      </div>
      <div className="flex flex-col w-full md:w-1/4 px-4 py-2 space-y-1 md:space-y-2 lg:space-y-4">
        <div className="flex flex-row w-full justify-between">
          <h2 className="text-white hidden md:flex text-md md:font-xl lg:text-2xl font-medium md:font-semibold">
            Nomor Telepon
          </h2>
          <a href={"https://api.whatsapp.com/send?phone=6285920685311&text=Hubungi%20admin"} className="flex flex-row space-x-2 md:absolute md:left-3/4">
            <PhoneIcon className="text-white h-4 w-4 text-md md:font-xl lg:text-2xl font-medium md:font-semibold lg:w-8 lg:h-8" />
            <p className="text-white text-sm md:font-xl lg:text-2xl font-medium  md:font-semibold">
              085920685311
            </p>
          </a>
        </div>
        <div className="flex flex-row w-full justify-between">
          <h2 className="text-white hidden md:flex text-md md:font-xl lg:text-2xl font-medium md:font-semibold">
            Alamat
          </h2>
          <div className="flex flex-row space-x-2 md:absolute md:left-3/4 ">
            <OfficeBuildingIcon className="text-white h-4 w-4 text-md font-medium lg:text-2xl lg:w-8 lg:h-8" />
            <p className="text-white text-sm font-medium lg:text-2xl">
              {" "}
              Jl. Cibubur, RT.9/RW.1, Jakarta Timur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
