import EmptyIllustration from "../../assets/Empty.svg";

export default function InvalidProductPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={EmptyIllustration} className="w-3/6 h-3/6 md:w-2/6 lg:w-2/6  md:h-2/6 lg:h-2/6" />
      <h1 className="text-blue-900 mt-2 font-semibold md:text-xl lg:text-2xl">
        Produk tidak ditemukan.
      </h1>
    </div>
  );
}
