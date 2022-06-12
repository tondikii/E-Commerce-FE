import { Fragment, useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../configs/api";
import ProductCard from "../../components/cards/Product";
import { useLocation, useParams } from "react-router-dom";
import InvalidProductPage from "../errors/InvalidProduct";
import Footer from "../../components/navigator/Footer";


export default function HomePage() {
  const { pathname } = useLocation();
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchByFilter = () => {
    return new Promise((resolve, reject) => {
      apiInstance
        // .get(
        //   `/products/get?category=${
        //     pathname === "/" ? null : `${pathname === "/tanks" ? 1 : 2}`
        //   }`
        // )
        .get(`/products/get?${query}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    apiInstance
      .get("/products/get")
      .then(({ data }) => {
        console.log({ data });
        setData(data.rows);
      })
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchByFilter()
      .then((data) => {
        console.log({ data });
        setData(data.rows);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally((res) => setLoading(false));
  }, [pathname]);

  if (!data || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-blue-900 text-5xl font-semibold">Loading...</h1>
      </div>
    );

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

{/* <div className="flex flex-1 flex-col min-h-screen justify-between">
    </div> */}