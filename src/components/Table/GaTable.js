
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const GaTable = ({ domains, onCellClick, selectedDomain }) => {
    return (
        <>
            <Card>
            <Table sx={{minWidth : "600px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: "600"}}>Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{ fontWeight: "600"}}>Url</Typography>
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {domains.map(domain => (
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ fontSize : "12pt" }}>{domain.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontSize : "12pt" }}>{domain.websiteUrl}</Typography>
                            </TableCell>
                            <TableCell sx={{textAlign : "center"}}>
                                {selectedDomain === domain.websiteUrl ? (
                                    <>
                                        <CheckCircleRoundedIcon color="success" />
                                    </>
                                ) : (
                                    <Button variant="contained" color="secondary" onClick={() => onCellClick(domain)}>Select</Button>
                                )}
                               
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
            </Card>
        </>
    )
}