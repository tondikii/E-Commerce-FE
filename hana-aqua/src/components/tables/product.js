import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Menu,
  MenuItem,
  // Button
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e3a8a",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, picture, name, price, stock) {
  return { id, picture, name, price, stock };
}

const rows = [
  createData(
    1,
    "https://ik.imagekit.io/fnzl2pmmqv2d/sample-cupang-halfmoon_X_jJy9_8v.jpeg",
    "Halfmoon Green Betta Fish",
    250000,
    1
  ),
  createData(
    2,
    "https://ik.imagekit.io/fnzl2pmmqv2d/sample-cupang-halfmoon-2_oEKZGFIIu.jpeg",
    "Halfmoon Red Betta Fish",
    150000,
    5
  ),
  createData(
    3,
    "https://ik.imagekit.io/fnzl2pmmqv2d/sample-cupang-halfmoon_X_jJy9_8v.jpeg",
    "Halfmoon Green Betta Fish",
    250000,
    1
  ),
  createData(
    4,
    "https://ik.imagekit.io/fnzl2pmmqv2d/sample-cupang-halfmoon-2_oEKZGFIIu.jpeg",
    "Halfmoon Red Betta Fish",
    150000,
    5
  ),
  createData(
    5,
    "https://ik.imagekit.io/fnzl2pmmqv2d/sample-cupang-halfmoon_X_jJy9_8v.jpeg",
    "Halfmoon Green Betta Fish",
    250000,
    1
  ),
];

export default function ProductTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Picture</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Stock</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>
                <img
                  src={row.picture}
                  className="w-24 h-24 rounded-md"
                  alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvVoEwccFcHU9NWVoFEa1595e8FuiRHr7fA&usqp=CAU"
                />
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.stock}</StyledTableCell>
              <StyledTableCell>
                <button onClick={handleClick}>
                  <DotsVerticalIcon
                    className="w-5 h-5 text-gray-600"
                    role="button"
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
