import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setJobs, setLoading, setError } from "../store/";
import { setProducts, setLoading, setError } from "../store/reducers/root";
import apiInstance from "../configs/api";

export default function useFetchJobs() {
  const { products } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    apiInstance
      .get("/products/get", {
        headers: { access_token: localStorage.access_token },
      })
      .then(({ data }) => {
        console.log({data});
        dispatch(setProducts(data.rows))
      })
      .catch(({ response }) => {
        console.log({response});
        dispatch(setError("Error Fetching Products"))
      })
      .finally((res) => {
        dispatch(setLoading(false))
      });
  }, []);
  console.log({ products });
  return  products ;
}
