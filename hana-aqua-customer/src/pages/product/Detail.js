import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../configs/api";
import Loading from "../../components/notif/Loading";
import { rupiah } from "../../helpers/currencyFormatter";
import WhatsAppImage from "../../assets/whatsapp.png"
console.log({WhatsAppImage})

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    setLoading(true);
    apiInstance
      .get(`/products/get/${id}`)
      .then(({ data }) => {
        console.log(data, "<<<<<<");
        setProduct(data);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally((res) => {
        setLoading(false);
      });
  }, []);

  if (loading || !product) return <Loading />;

  return (
    <div className="flex flex-col justify-start w-full self-center space-y-4 px-4">
      <img
        src={product.imageURL}
        className="w-96 h-96 rounded-md self-center "
      />
      <div className="flex flex-col space-y-1">
        <h3 className="text-xl text-gray-500 font-semibold">
          {product.Category == 1 ? "Akuarium" : "Kolam"}
        </h3>
        <h1 className="text-2xl text-gray-900 font-bold">{product.name}</h1>
        <h2 className="text-2xl text-gray-900 font-bold">{`RP ${rupiah(
          product.price
        )}`}</h2>
      </div>
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl text-gray-900 font-semibold">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
      <a
      href={`https://api.whatsapp.com/send?phone=6285920685311&text=Saya%20tertarik%20dengan%20produk%20${product.name}`}
    >
      <button className="bg-green-700 flex flex-row w-96 self-center px-4 py-2 rounded-md items-center justify-center space-x-2">
        <img className="h-6 w-6" src={WhatsAppImage} />
        <p className="text-white text-md font-medium">Beli</p>
      </button>
    </a>
    </div>
  );
}
