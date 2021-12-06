
import React, { ReactNode } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { CheckCircle, Pending, Error, Send } from '@mui/icons-material';
import { publishMessage } from '../services/serviceBus';
type Status = 'pending' | 'processing' | 'completed';

type ActionProps = {
    order: number,
    title: string,
    status: Status,
    payload?: any
}

const Action: React.FC<ActionProps> = ({ order, title, status, payload }) => {

    const publish = async () => {
        const message = {
            order,
            title,
            payload
        }
        await publishMessage(message);
    }

    const getStatusIcon = (status: Status): ReactNode => {
        switch (status) {
            case 'pending':
                return <Pending />
            case 'processing':
                return <CircularProgress size={20} />
            case 'completed':
                return <CheckCircle />
            default:
                return <Error />
        }
    }

    return (<Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}>
        <Typography variant="body1" gutterBottom>
            {order}. {title}
        </Typography>
        {getStatusIcon(status)}
        <Button startIcon={<Send />} onClick={publish}>Send</Button>
    </Stack>
    )
}

export default Action;