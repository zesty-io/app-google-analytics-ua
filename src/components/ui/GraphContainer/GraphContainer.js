import { CardContent, Card,Typography, Box, CircularProgress } from "@mui/material"

export const GraphContainer = ({title, loading = false, subTitle, rightMenu,children}) => {

    return (
            <Card 
                sx={{
                    padding: '20px'
                }}>
                <Box 
                    display="flex" 
                    justifyContent="center"
                    gap={4}>
                    <Box 
                        flexGrow={1}>
                        <Typography 
                            variant="h2"
                            sx={{
                                fontWeight : '600',
                                fontSize : '14pt',
                                color : '#5b667d',
                            }}>{title}</Typography>
                    </Box>
                    <Box>
                        {rightMenu}
                    </Box>
                    <Box>
                        <Typography  
                            variant="h2"
                            sx={{
                                fontWeight: '200',
                                fontSize : '14pt'
                            }} 
                            >{subTitle}</Typography>
                    </Box>
                </Box>
                <Box
                sx={{
                    paddingTop: '18px',
                    position: "relative"}}>
                    {loading && (
                        <Box sx={{
                            top: 0,
                            left : 0,
                            right: 0,
                            bottom : 0,
                            position : "absolute",
                            backgroundColor: "rgba(255,255,255, 0.7)",
                            display : "flex",
                            alignItems : "center",
                            justifyContent : "center"
                        }}>
                            <CircularProgress />
                        </Box>
                    )}
                    
                    {children}
                </Box>
        </Card>
    )

}

