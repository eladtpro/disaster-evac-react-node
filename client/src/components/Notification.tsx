import React from 'react';
import { Snackbar, SnackbarCloseReason } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type NotificationProps = {
    message?: React.ReactNode,
    error?: boolean,
    open: boolean,
    autoHideDuration?: number,
    onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ message, error, open, onClose, autoHideDuration }) => {

    const handleClose = (event?: any, reason?: string | SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        onClose();
    };

    return (<Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={open}
        autoHideDuration={autoHideDuration || 6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>);
}

export default Notification