import { Box, Typography } from "@mui/material"

export default function Journey(){

    return (
        <>
            <Box sx={{
                height : "100%",
                width : "100%",
                display : "flex",
                alignItems : "center",
                justifyContent : "center"
            }}>
                <Box>
                    <Typography sx={{
                        fontWeight : "bold",
                        fontSize : "16pt"
                    }}>Coming Soon.</Typography>
                </Box>
            </Box>
        </>
    )

}