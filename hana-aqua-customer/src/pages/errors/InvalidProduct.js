import EmptyIllustration from "../../assets/Empty.svg";
export default function InvalidProductPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={EmptyIllustration} className="w-4/6 h-4/6" />
      <h1 className="text-blue-900 mt-2 font-semibold">
        Produk tidak ditemukan
      </h1>
    </div>
  );
}
