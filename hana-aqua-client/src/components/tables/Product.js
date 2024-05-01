import {styled} from "@mui/material/styles";
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
import {tableCellClasses} from "@mui/material/TableCell";
import {ScaleLoader} from "react-spinners";
import MenuButton from "../buttons/Menu";
import {rupiah} from "../../helpers/currencyFormatter";
import useFetchProducts from "../../hooks/useFetchProducts";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e3a8a",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductTable() {
  const {
    data,
    limit,
    page,
    loading,
    setSearchParams,
    setRefetch,
    deleteSearchParams,
  } = useFetchProducts();

  const handleChangePage = (event, newPage) => {
    setSearchParams({page: newPage + 1});
  };

  const handleChangeLimit = (event) => {
    deleteSearchParams("page");
    setSearchParams({limit: event.target.value});
  };

  const refetchData = () => {
    setRefetch(true);
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center" className="!py-7">
            <ScaleLoader
              color="#1f3a8a"
              height={64}
              width={10}
              className="!block"
              margin={3.25}
            />
          </TableCell>
        </TableRow>
      );
    } else if (Array.isArray(data?.rows) && data.rows.length > 0) {
      return data.rows.map((row) => (
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
          <StyledTableCell>{`RP ${rupiah(row.price)}`}</StyledTableCell>
          <StyledTableCell>
            <MenuButton id={row.id} refetchData={refetchData} />
          </StyledTableCell>
        </StyledTableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center" className="!py-14">
            <span className="!block">Data tidak tersedia.</span>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Gambar</StyledTableCell>
            <StyledTableCell>Nama</StyledTableCell>
            <StyledTableCell>Harga</StyledTableCell>
            <StyledTableCell>Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTableContent()}</TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 4, 5]}
        component="div"
        count={data?.count || 0}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
      />
    </TableContainer>
  );
}
