

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Box } from '@mui/material'
import Overview from '../../Overview'
import PageContent from '../../PageContent'
import Journey from '../../Journey'
import NavBar from '../NavBar/NavBar'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'

const Menu = () => (
    <Paper sx={{ width: 250, maxWidth: '100%' }}>
        <MenuList>
            <MenuItem 
                component={Link} to="/">
                <Typography sx={{ fontWeight : "bold" }}>
                    Overview
                </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/content">
                <Typography sx={{ fontWeight : "bold" }}>
                    Pages
                </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/journey">
                <Typography sx={{ fontWeight : "bold" }}>
                    Journey
                </Typography>
            </MenuItem>
        </MenuList>
    </Paper>
)

export default function AppWrapper(props){
    return (
        <Box p={4}>
           
           <NavBar zuid={props.instance.ZUID} token={props.token}/>
           <Router>
                <Box sx={{ display : "flex", gap : 4 }}>
                        <Box>
                            <Menu />
                        </Box>
                        <Box sx={{ flexGrow : 1 }}>
                            <Routes>
                                <Route path="/" element={<Overview {...props} />} />
                                <Route path="/content" element={<PageContent {...props} />} />
                                <Route path="/journey" element={<Journey {...props} />} />
                            </Routes>
                        </Box>
                </Box>
            </Router>
            
        </Box>
    )
}