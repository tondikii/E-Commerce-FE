import Sidebar from "../../components/navigators/Sidebar";
import ProductForm from "../../components/forms/Product";
import Layout from "../../components/layout/Wrapper";

export default function CreateProduct() {
  return (
    <div className="flex flex-row space-x-4">
      <Sidebar />
      <Layout>
        <ProductForm title="Buat Produk Baru" />
      </Layout>
    </div>
  );
}
