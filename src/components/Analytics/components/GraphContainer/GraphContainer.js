import { CardContent, Card,Typography, Box } from "@mui/material"

export const GraphContainer = ({title, icon, subTitle, children}) => {

    return (
        <Box
            sx={{
                backgroundColor : '#fff'
            }} >
            <Box 
                sx={{
                    padding: '0px',
                    border : '1px solid #c3cddf',
                    borderRadius : '4px',
                    overFlow : 'hidden'
                }}>
                <Box 
                    display="flex" 
                    justifyContent="center"
                    sx={{
                        padding : '12px',
                        backgroundColor : '#e4e9f1'
                    }}>
                    <Box 
                        flexGrow={1}>
                        <Typography 
                            variant="h2"
                            sx={{
                                fontWeight : '600',
                                fontSize : '14pt',
                                color : '#5b667d',
                                backgroundColor : '#e4e9f1'
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
                    padding: '12px'}}>
                    {children}
                </Box>
        </Box>
    </Box>
    )

}

