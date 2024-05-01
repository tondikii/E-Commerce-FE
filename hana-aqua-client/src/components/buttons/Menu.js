import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiInstance from "../../configs/api";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
} from "../../store/reducers/root";

const  MenuButton = ({ id,  refetchData = () => {}}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onDelete = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: "question",
        title: `Hapus Produk `,
        text: `Apakah kamu yakin ingin menghapus produk id ${id}`,
      });
      if (isConfirmed) {
        dispatch(setLoading(true));
        const { data } = await apiInstance.delete(`products/delete/${id}`, {
          headers: { access_token: localStorage.access_token },
        });
        if (data.message) {
          refetchData()
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
            title: `Berhasil menghapus produk id ${id}`,
          });
        }
      }
    } catch (err) {
      dispatch(setError(`Gagal menghapus produk id ${id}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
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
        <MenuItem onClick={onDelete}>Hapus</MenuItem>
      </Menu>
    </>
  );
}

export default MenuButton