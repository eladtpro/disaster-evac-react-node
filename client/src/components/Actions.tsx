import React, { ReactNode, useContext, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button
} from '@mui/material';
import { CheckCircle, Pending, Error, Send } from '@mui/icons-material';
import { queueChange } from '../services/serviceBus';
import { GLobalContext } from '../state/GlobalContext';

type Status = 'pending' | 'processing' | 'completed' | 'error';

interface RowData {
    order: number;
    title: string;
    status: Status;
    payload?: any
}

const Actions: React.FC = () => {
    const { setNotification } = useContext(GLobalContext);
    const [rows, setRows] = useState<RowData[]>([
        { order: 1, title: 'Register Candidate', status: 'pending' },
        { order: 2, title: 'Determine Target Facility', status: 'pending' },
        { order: 3, title: 'Select Transportation To Facility', status: 'pending' },
        { order: 4, title: 'Verify Arrival to Transportation', status: 'pending' },
        { order: 5, title: 'Complete Process', status: 'pending' }
    ]);

    const getStatusIcon = (status: Status): ReactNode => {
        switch (status) {
            case 'pending':
                return <Pending />;
            case 'processing':
                return <CircularProgress size={20} />;
            case 'completed':
                return <CheckCircle />;
            case 'error':
                return <Error />;
            default:
                return <Error />
        }
    }

    const onClick = (row: RowData) => {
        let copy = [...rows];
        const index = copy.findIndex(r => r.order === row.order);
        copy[index].status = 'processing';
        setRows(copy);

        queueChange(row)
            .then((res) => {
                copy = [...rows];
                const index = copy.findIndex(r => r.order === row.order);
                copy[index].status = 'completed';
                copy[index].payload = res.operation_id;
                setRows(copy);
                setNotification({ message: `${copy[index].title} queued successfully` });
            })
            .catch(err => {
                copy = [...rows];
                const index = copy.findIndex(r => r.order === row.order);
                copy[index].status = 'error';
                setRows(copy);
                setNotification({ message: `${copy[index].title} - ${err.message}`, error: true });
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="actions table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Payload</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.order}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{row.order}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell>{row.payload}</TableCell>
                            <TableCell>{getStatusIcon(row.status)}</TableCell>
                            <TableCell align="right"><Button endIcon={<Send />} onClick={() => onClick(row)} disabled={row.status === 'completed' || row.status === 'processing'}>Send</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Actions;