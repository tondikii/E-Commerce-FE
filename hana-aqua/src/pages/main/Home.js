import Sidebar from "../../components/navigators/Sidebar";
import ProductTable from "../../components/tables/Product";
import AddButton from "../../components/buttons/Add";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../../hooks/useFetchProducts";
import Layout from "../../components/layout/Wrapper";

export default function HomePage() {
  const navigate = useNavigate();
  const products = useFetchProducts();

  return (
    <div className="flex flex-row space-x-4">
      <Sidebar />
      <Layout>
        <div className="p-10 pl-72 w-full">
          <div
            className="mb-2"
            role="button"
            onClick={() => navigate("/create")}
          >
            <AddButton logoSize={24} />
          </div>
          <ProductTable data={products} />
        </div>
      </Layout>
    </div>
  );
}
