import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TablePagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import MenuButton from "../buttons/Menu";
import { useDispatch } from "react-redux";
import { setTableLimit, setTablePage } from "../../store/reducers/root";
import { useSelector } from "react-redux";

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

export default function ProductTable({ data }) {
  const dispatch = useDispatch();
  const { table } = useSelector((state) => state.rootReducer);

  const handleChangePage = (event, newPage) => {
    dispatch(setTablePage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setTableLimit(+event.target.value));
    dispatch(setTablePage(1));
  };

  if (data)
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
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={row.imageURL}
                    className="w-24 h-24 rounded-md"
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvVoEwccFcHU9NWVoFEa1595e8FuiRHr7fA&usqp=CAU"
                  />
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>{row.stock}</StyledTableCell>
                <StyledTableCell>
                  <MenuButton id={row.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 4, 5]}
          component="div"
          count={table.count}
          rowsPerPage={table.limit}
          page={table.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
}
