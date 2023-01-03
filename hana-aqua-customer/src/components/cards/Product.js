import {rupiah} from "../../helpers/currencyFormatter";
import {useNavigate} from "react-router";
export default function ProductCard({item}) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col bg-white p-4 rounded-md shadow-md justify-center hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <img
        className="w-40 h-40 lg:w-52 lg:h-52 rounded-md cursor-pointer lg:self-center"
        src={item.imageURL}
      />
      <div className="space-y-1 mt-2">
        <p className="cursor-pointer text-gray-500 font-medium text-sm md:text-md lg:text-lg xl:text-xl lg:font-semibold">
          {item.CategoryId === 1 ? "Tanks" : "Ponds"}
        </p>
        <p className="cursor-pointertext-gray-900 font-medium text-md md:text-lg lg:text-xl lg:font-semibold">
          {item.name}
        </p>
        <p className="text-gray-900 text-lg md:text-xl lg:text-2xl font-semibold lg:font-bold">{`RP ${rupiah(
          item.price
        )}`}</p>
      </div>
    </div>
  );
}
