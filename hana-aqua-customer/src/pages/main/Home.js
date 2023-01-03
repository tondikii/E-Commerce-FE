import {Fragment, useCallback, useState} from "react";
import {useEffect} from "react";
import apiInstance from "../../configs/api";
import ProductCard from "../../components/cards/Product";
import {useParams} from "react-router-dom";
import InvalidProductPage from "../errors/InvalidProduct";
import {useSelector} from "react-redux";
import Loading from "../../components/notif/Loading";

export default function HomePage() {
  const {category} = useSelector((state) => state.root);
  const {query} = useParams();
  const [data, setData] = useState([]);
  const [stopScroll, setStopScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [unavailable, setUnavailable] = useState(false);
  const [displayUnavailable, setDisplayUnavailable] = useState(false);

  function getLimitByWindowDimensions() {
    const {innerWidth: width} = window;
    if (width >= 768 && width < 1280) return 8;
    else if (width >= 1280) return 12;
    else return 4;
  }

  const fetchByFilter = () => {
    const renderQueryCategory = () => {
      if (!category) return "";
      return `${query ? "&" : ""}category=${category}`;
    };
    const renderQueryLimit = () => {
      return `${query ? "&" : ""}limit=${getLimitByWindowDimensions()}`;
    };
    return new Promise((resolve, reject) => {
      apiInstance
        .get(
          `/products/get?${
            query || ""
          }${renderQueryCategory()}${renderQueryLimit()}&page=${page}`
        )
        .then(({data}) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    if (page > 1) setLoadingScroll(true);
    else setLoading(true);
    fetchByFilter()
      .then((response) => {
        if (!response.rows.length) setUnavailable(true);
        setData((prevState) => {
          if (page === 1) return response.rows;
          return [...prevState, ...response.rows];
        });
      })
      .catch((err) => {
        console.error({err});
      })
      .finally((res) => {
        if (page > 1) setLoadingScroll(false);
        else setLoading(false);
        setStopScroll(false);
      });
  }, [category, query, page]);

  const scrolling = useCallback(() => {
    window.onscroll = () => {
      const {innerHeight} = window;
      const {scrollTop, offsetHeight} = document.documentElement;
      let bottomOfWindow = scrollTop + innerHeight >= offsetHeight - 1;
      if (bottomOfWindow) {
        if (!stopScroll && !unavailable) {
          setPage((prevState) => prevState + 1);
          setStopScroll(true);
        } else if (unavailable) {
          setDisplayUnavailable(true);
        }
      } else if (scrollTop + innerHeight <= offsetHeight - 50) {
        setDisplayUnavailable(false);
      }
    };
  }, [stopScroll, unavailable]);

  useEffect(() => {
    scrolling();
  }, [stopScroll, unavailable]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {data.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 p-4">
            {data.map((el) => (
              <ProductCard item={el} key={el.id} />
            ))}
          </div>
          <div className="flex flex-col justify-center">
            {loadingScroll && <Loading />}
            {displayUnavailable && (
              <h1 className="text-red-600 text-center">
                Produk tidak tersedia.
              </h1>
            )}
          </div>
        </div>
      ) : (
        <InvalidProductPage />
      )}
    </Fragment>
  );
}
