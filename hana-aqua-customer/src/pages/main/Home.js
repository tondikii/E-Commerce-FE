import { Fragment, useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../configs/api";
import ProductCard from "../../components/cards/Product";
import { useParams } from "react-router-dom";
import InvalidProductPage from "../errors/InvalidProduct";
import { useSelector } from "react-redux";
import Loading from "../../components/notif/Loading";

export default function HomePage() {
  const { category } = useSelector((state) => state.root);
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchByFilter = () => {
    const renderQueryCategory = () => {
      if (!category) return "";
      return `${query ? "&" : ""}category=${category}`;
    };
    return new Promise((resolve, reject) => {
      apiInstance
        .get(`/products/get?${query || ""}${renderQueryCategory()}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchByFilter()
      .then((data) => {
        setData(data.rows);
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally((res) => setLoading(false));
  }, [category, query]);

  if (!data || loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 p-4">
          {data.map((el) => (
            <ProductCard item={el} key={el.id} />
          ))}
        </div>
      ) : (
        <InvalidProductPage />
      )}
    </Fragment>
  );
}
