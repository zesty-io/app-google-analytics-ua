import { CardContent, Card,Typography, Box } from "@mui/material"

export const GraphContainer = ({title, icon, subTitle, children}) => {

    return (
            <Card 
                sx={{
                    padding: '20px'
                }}>
                <Box 
                    display="flex" 
                    justifyContent="center">
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
                    paddingTop: '18px'}}>
                    {children}
                </Box>
        </Card>
    )

}

