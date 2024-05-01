import Sidebar from "../../components/navigators/Sidebar";
import ProductTable from "../../components/tables/Product";
import AddButton from "../../components/buttons/Add";
import Layout from "../../components/layout/Wrapper";

export default function HomePage() {

  return (
    <div className="flex flex-row space-x-4">
      <Sidebar />
      <Layout>
        <div className="p-10 pl-72 w-full">
          <a
            role="button"
            href="/create"
          >
            <AddButton  logoSize={24} className="mb-2"/>
          </a>
          <ProductTable/>
        </div>
      </Layout>
    </div>
  );
}
