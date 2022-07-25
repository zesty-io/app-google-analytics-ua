
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import { Typography } from '@mui/material';

export default function SearchBarFilterMenu({ data, isTyping, onMenuClick}){


    return (
        <>
            <Paper sx={{
                maxHeight : "400px",
                overflowY : "auto",
                width : "600px" 
            }}>
                {isTyping && (
                    <>
                        <Box sx={{ 
                                display : "flex",
                                alignItems : "center",
                                justifyContent : "center",
                                height : "100px" }}>
                            <CircularProgress />
                        </Box>
                    </>
                )}
                {data && !isTyping && data.length !== 0 && (
                    <List>
                    {data.map(value => (
                        <>
                            {value.web.path && (
                                <>
                                <ListItemButton onClick={() => onMenuClick(`/content?q=${value.web.path}`)}>
                                    <ListItemText primary={value.web.metaTitle} secondary={value.web.path} />
                                </ListItemButton>
                                <Divider />
                                </>
                            )}
                        </>
                        
                    ))}
                </List>
                )}
                {(data && !isTyping && data.length === 0 ) && (
                    <>
                        <Box sx={{ 
                                display : "flex",
                                alignItems : "center",
                                justifyContent : "center",
                                height : "100px" }}>
                            <Typography sx={{
                                fontWeight : "bold"
                            }}>No Data Found</Typography>
                        </Box>
                    </>
                )}
            </Paper>
            
        </>
    )

}