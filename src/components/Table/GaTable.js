
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
export const GaTable = ({ domains, onCellClick }) => {
    return (
        <>
            <Card sx={{
                padding : '20px'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width : "300px" }}>
                                <Typography sx={{fontSize : "12pt", fontWeight: "600"}}>Domain</Typography>
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {domains.map(domain => (
                            <TableRow>
                                <TableCell>
                                    <Typography sx={{ fontSize : "12pt" }}>{domain.siteName}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => onCellClick(domain)}>Select</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}