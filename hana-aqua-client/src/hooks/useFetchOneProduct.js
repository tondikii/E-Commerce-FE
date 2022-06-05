import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProduct, setLoading, setError } from "../store/reducers/root";
import apiInstance from "../configs/api";

export default function useFetchOneProduct({id}) {
  const { product } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    apiInstance
      .get(`/products/get/${id}`, {
        headers: { access_token: localStorage.access_token },
      })
      .then(({ data }) => {
        dispatch(setProduct(data))
      })
      .catch((err) => {
        dispatch(setError("Error Fetching Product"))
      })
      .finally((res) => {
        dispatch(setLoading(false))
      });
  }, []);
  return  product ;
}
