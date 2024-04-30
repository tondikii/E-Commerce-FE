import {useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import apiInstance from "../configs/api";
import Swal from "sweetalert2";

export default function useFetchProducts() {
  const [searchParams, setSearchParamsProps] = useSearchParams();
  const {search: queryString} = useLocation();

  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = {
    limit: searchParams.get("limit") || 4,
    page: searchParams.get("page") || 1,
  };

  const paramsString = new URLSearchParams({...params}).toString();

  const setSearchParams = (objParam) => {
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    setSearchParamsProps({...searchParamsObject, ...objParam});
  };

  const deleteSearchParams = (param) => {
    searchParams.delete(param);
    setSearchParamsProps(searchParams);
  };

  const hitApi = async () => {
    try {
      setLoading(true);
      const {data} = await apiInstance.get(`/products/get?${paramsString}`, {
        headers: {access_token: localStorage.access_token},
      });
      setData(data);
    } catch (err) {
      const errorMessage = "Error Fetching Products";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hitApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
    if (refetch) {
      hitApi();
      setRefetch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return {
    data,
    ...params,
    loading,
    error,
    setSearchParams,
    setRefetch,
    deleteSearchParams,
  };
}
