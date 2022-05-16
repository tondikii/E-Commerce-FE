import Sidebar from "../components/navigators/Sidebar";
import ProductTable from "../components/tables/product";
export default function HomePage() {
  return (
    <div className="flex flex-row space-x-4">
      <Sidebar />
      <div className="p-10 pl-80 w-full">
        <ProductTable />
      </div>
    </div>
  );
}
