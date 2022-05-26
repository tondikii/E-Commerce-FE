import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../store/reducers/root";
import { useEffect } from "react";
import Swal from "sweetalert2";

function NotifError() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.rootReducer);
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      }).then((res) => {
        dispatch(setError(null));
      })
    }
  });

  return null;
}

export default NotifError;
