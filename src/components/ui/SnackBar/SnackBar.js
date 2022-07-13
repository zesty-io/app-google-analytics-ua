import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState("")
    const [message, setMessage] = useState("")

    useImperativeHandle(ref, () => ({
        show(message){
            setOpen(true)
            setAlertType("success")
            setMessage(message)
        },
        error(message){
            setOpen(true)
            setAlertType("error")
            setMessage(message)
        }
    }))

    const handleClose = () => {
      setOpen(false);
    };
    
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} {...props} >
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
})

export default CustomSnackbar