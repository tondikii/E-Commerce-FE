import {useSelector} from "react-redux";
import Loading from "../notifications/Loading";
import NotifError from "../notifications/ErrorAlert";
import {Fragment} from "react";

function Layout({children}) {
  const {loading, error} = useSelector((state) => state.rootReducer);

  return (
    <Fragment>
      {error && <NotifError />}
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full pl-64">
          <Loading size={64} />
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
}

export default Layout;
