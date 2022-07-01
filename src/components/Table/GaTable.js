import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";

export const GaTable = ({ domains = [], onCellClick, selectedDomain }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Card}>
        {domains.length !== 0 ? (
          <Table sx={{ minWidth: "600px" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: "600" }}>Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "600" }}>Url</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? domains.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : domains
              ).map((domain) => (
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: "12pt" }}>
                      {domain.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "12pt" }}>
                      {domain.websiteUrl}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {selectedDomain === domain.name ? (
                      <>
                        <CheckCircleRoundedIcon color="success" />
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onCellClick(domain)}
                      >
                        Select
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={domains.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <Box
            sx={{
              padding: 4,
              minWidth: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600 }} variant="h5">
              There is no domain to select.
            </Typography>
          </Box>
        )}
      </TableContainer>
    </>
  );
};
