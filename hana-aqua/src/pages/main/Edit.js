import Sidebar from "../../components/navigators/Sidebar";
import ProductForm from "../../components/forms/Product";
import Layout from "../../components/layout/Wrapper";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../store/reducers/root";
import useFetchOneProduct from "../../hooks/useFetchOneProduct";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useFetchOneProduct({id});

  useEffect(() => {
    dispatch(setProduct(null));
  }, []);
  return (
    <div className="flex flex-row space-x-4">
      <Sidebar />
      <Layout>
        <ProductForm title={`Edit Product Id ${id}`} id={id} product={product} />
      </Layout>
    </div>
  );
}
