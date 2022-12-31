import UnavailableIllustration from "../../assets/Unavailable.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <img src={UnavailableIllustration} className="w-4/6 h-4/6" />
      <h1 className="text-blue-900 mt-2 font-semibold">
        Halaman tidak ditemukan.
      </h1>
    </div>
  );
}
