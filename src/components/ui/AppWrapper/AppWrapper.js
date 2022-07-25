

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import { Box } from '@mui/material'
import Overview from '../../Overview'
import PageContent from '../../PageContent'
import Journey from '../../Journey'
import NavBar from '../NavBar/NavBar'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'
import { GoogleAuthOverlay } from '../AuthOverlay'
import { useGoogle } from '../../../context/GoogleContext'
import { useEffect, useState } from 'react'
import { useFetchWrapper } from '../../../services/useFetchWrapper'

const Menu = () => (
    <Paper sx={{ 
            width: 250, 
            maxWidth: '100%', 
            position : "sticky",
            position: "-webkit-sticky",
            top: 0,
        }}>
        <MenuList>
            <MenuItem 
                component={Link} to="/">
                <Typography color="primary" sx={{ fontWeight : "bold" }}>
                    Overview
                </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/content">
                <Typography color="primary"  sx={{ fontWeight : "bold" }}>
                    Pages
                </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/journey">
                <Typography  color="primary"  sx={{ fontWeight : "bold" }}>
                    Journey
                </Typography>
            </MenuItem>
        </MenuList>
    </Paper>
)


export default function AppWrapper(props){

    const { isAuthenticated, setIsAuthenticated } = useGoogle()
    const { getUserData } = useFetchWrapper(props.instance.zuid, props.token)
    const [userId, setUserId] = useState(null)

    useEffect( async () => {

        const user = await getUserData();
        if (user.data === null) return setIsAuthenticated(false)
        setUserId(user.data);

    }, [])

    return (
        <>
        
        <Router basename="/google-analytics">
            <NavBar zuid={props.instance.ZUID} token={props.token}/>
            <Box sx={{
                p : 4,
                marginTop: 10
            }}>
                <GoogleAuthOverlay user={userId} instance={props.instance} isAuthenticated={isAuthenticated} />
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
            
                
            </Box>
        </Router>
        </>
    )
}