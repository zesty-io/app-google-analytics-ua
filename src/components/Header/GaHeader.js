
import { Typography, Box, Button, Card } from '@mui/material'
import { GaTable } from '../Table/GaTable'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

export const GaHeader = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Card
                    sx={{
                        position : "absolute",
                        top : "50%",
                        left : "50%",
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <GaTable domains={[{
                        siteName : "www.youtube.com"
                    },{
                        siteName : "www.facebook.com"
                    },{
                        siteName : "www.instagram.com"
                    }]} onCellClick={(data) => {
                        console.log(data)
                        setShowModal(false)
                    }} />
                </Card>
               
            </Modal>

            <Box
                sx={{
                    display : 'flex',
                    padding : '40px',
                    paddingBottom : '0px',
                    alignItems: "center"
                }}>
                <Box sx={{ flexGrow : 1 }}>
                    <Typography 
                        variant='h2'
                        sx={{
                            fontWeight : '600',
                            fontSize : '16pt',
                            color : '#5b667d',
                        }}>
                        No Domain Selected
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => setShowModal(true)}>Select Domain</Button>
                </Box>
            </Box>
            
            
        </>
    )

}