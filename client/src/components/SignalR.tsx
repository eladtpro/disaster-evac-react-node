
import React, { useState, useEffect, useContext } from 'react';
import { Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Bolt, PowerOff, ElectricalServices, Power } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useSignalR, { ConnectionDetails } from '../hooks/useSignalR';
import { configuration, reactPlugin } from '../core';
import { GLobalContext } from '../state/GlobalContext';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

const SignalR: React.FC = () => {
    const { setNotification } = useContext(GLobalContext);
    const { start, stop, register, getConnectionDetails } = useSignalR();

    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const [socketSupport, setSocketSupport] = useState<boolean>(false);
    const [details, setDetails] = useState<ConnectionDetails | undefined>(undefined);


    useEffect(() => {

        const supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window;
        setSocketSupport(supportsWebSockets)

        getConnectionDetails()
            .then(setDetails);

        if (!configuration.signalr.disconnectBeforeUnload) return;

        window.addEventListener("beforeunload", ev => {
            ev.preventDefault();
            stop();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const connect = async () => {
        try {
            setStatus('connecting')
            await start(details);
            reactPlugin.trackEvent({ name: 'SignalR Connected', properties: { details: 'signalr react connection' } });
            register('statusUpdates', (args: any[]) => console.log('statusUpdates', args));
            setNotification({ message: 'SignalR Connected!' });
            setStatus('connected');
        } catch (error) {
            setStatus('disconnected');
            setNotification({ message: 'Cannot connect to SignalR service via socket', error: true });
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDetails({ ...details!, url: value });
    }

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}>
            <LoadingButton
                title={`Socket ${socketSupport ? '' : 'NOT'} Supported`}
                onClick={async () => await connect()}
                loading={status === 'connecting'}
                loadingPosition="start"
                color={socketSupport ? 'success' : 'error'}
                startIcon={<Bolt />}
                variant="outlined">
                Connect
            </LoadingButton>
            <TextField
                fullWidth
                id="standard-helperText"
                value={details?.url}
                placeholder="SignalR Connection String"
                variant="standard"
                onChange={onChange}
            />
            <ToggleButtonGroup
                disabled
                value={status}
                exclusive
                aria-label="User/Group"
                color="success">
                <ToggleButton value={'connected'} aria-label="Connected">
                    <Tooltip title={'connected'}>
                        <Power />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value={'connecting'} aria-label="Connecting...">
                    <Tooltip title={'connecting...'}>
                        <ElectricalServices />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value={'disconnected'} aria-label="Disconnected">
                    <Tooltip title="disconnected">
                        <PowerOff />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>);
}

export default SignalR;