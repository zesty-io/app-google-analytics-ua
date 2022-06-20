import { CardContent, Card,Typography, Box } from "@mui/material"

export const GraphContainer = ({title, icon, subTitle, children}) => {

    return (
        <Card >
            <Box 
                sx={{
                    padding: '30px'
                }}>
                <Box 
                    display="flex" 
                    justifyContent="center"
                    sx={{
                        marginBottom : '20px'
                    }}>
                    <Box 
                        flexGrow={1}>
                        <Typography 
                            variant="h5"
                            sx={{
                                fontWeight : '500'
                            }}>{title}</Typography>
                    </Box>
                    <Box>
                        <Typography  
                            variant="h5"
                            sx={{
                                fontWeight: '200'
                            }} 
                            >{subTitle}</Typography>
                    </Box>
                </Box>
                <Box>
                    {children}
                </Box>
        </Box>
    </Card>
    )

}

