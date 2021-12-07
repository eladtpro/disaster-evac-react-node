import React, { ReactNode } from 'react';
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

type Status = 'pending' | 'processing' | 'completed';

interface RowData {
    order: number;
    title: string;
    status: Status;
    payload?: any
}

const rows: RowData[] = [
    { order: 1, title: 'Register Candidate', status: 'completed' },
    { order: 2, title: 'Determine Target Facility', status: 'processing' },
    { order: 3, title: 'Select Transportation To Facility', status: 'pending' },
    { order: 4, title: 'Verify Arrival to Transportation', status: 'pending' },
    { order: 5, title: 'Complete Process', status: 'pending' }
];

const Actions: React.FC = () => {

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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="actions table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.order}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{getStatusIcon(row.status)}</TableCell>
                            <TableCell align="right"><Button endIcon={<Send />} onClick={async () => await queueChange(row)}>Send</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Actions;