import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiInstance from "../../configs/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setProducts,
  setTableCount
} from "../../store/reducers/root";

export default function MenuButton({ id }) {
  const { table } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getData = () => {
    dispatch(setLoading(true));
    apiInstance
      .get(`/products/get?limit=${table.limit}&page=${table.page}`, {
        headers: { access_token: localStorage.access_token },
      })
      .then(({ data }) => {
        dispatch(setTableCount(data.count));
        dispatch(setProducts(data.rows));
      })
      .catch(({ response }) => dispatch(setError("Error Fetching Products")))
      .finally((res) => dispatch(setLoading(false)));
  };

  const onDelete = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: `Delete product `,
        text: `Are you sure want to delete product id ${id}`,
      });
      if (isConfirmed) {
        dispatch(setLoading(true));
        const { data } = await apiInstance.delete(`products/delete/${id}`, {
          headers: { access_token: localStorage.access_token },
        });
        if (data.message) {
          getData();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: `Product Id ${id} Deleted`,
          });
        }
      }
    } catch (err) {
      dispatch(setError(`Error Delete Product id ${id}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <button onClick={(event) => setAnchorEl(event.currentTarget)}>
        <DotsVerticalIcon className="w-5 h-5 text-gray-600" role="button" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate(`/edit/${id}`);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </Menu>
    </Fragment>
  );
}
