import UnavailableIllustration from "../../assets/Unavailable.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <img src={UnavailableIllustration} className="w-3/6 h-3/6 md:w-2/6 lg:w-2/6  md:h-2/6 lg:h-2/6 " />
      <h1 className="text-blue-900 mt-2 font-semibold md:text-xl lg:text-2xl xl:text-4xl">
        Halaman tidak ditemukan.
      </h1>
    </div>
  );
}
