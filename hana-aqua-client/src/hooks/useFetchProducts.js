import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setJobs, setLoading, setError } from "../store/";
import {
  setProducts,
  setLoading,
  setError,
  setTableCount,
} from "../store/reducers/root";
import apiInstance from "../configs/api";

export default function useFetchProducts() {
  const { products, table } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    apiInstance
      .get(`/products/get?limit=${table.limit}&page=${table.page}`, {
        headers: { access_token: localStorage.access_token },
      })
      .then(({ data }) => {
        console.log({ data });
        dispatch(setTableCount(data.count));
        dispatch(setProducts(data.rows));
      })
      .catch(({ response }) => {
        console.log({ response });
        dispatch(setError("Error Fetching Products"));
      })
      .finally((res) => {
        dispatch(setLoading(false));
      });
  }, [table.limit, table.page]);
  return products;
}
