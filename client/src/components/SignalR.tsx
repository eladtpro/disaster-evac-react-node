
import React, { useState, useEffect, useContext } from 'react';
import { Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Battery20, BatteryCharging50, BatteryChargingFull } from '@mui/icons-material';
import { start, stop, register } from '../services';
import { reactPlugin } from '../core';
import { GLobalContext } from '../state';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

const SignalR: React.FC = () => {
    const { setNotification } = useContext(GLobalContext);
    const [status, setStatus] = useState<ConnectionStatus>('disconnected');

    useEffect(() => {
        window.addEventListener("beforeunload", ev => {
            ev.preventDefault();
            if (ev.returnValue = 'Are you sure you want to disconnect SignalR socket?')
                stop();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const connect = async () => {
        try {
            await start();
            reactPlugin.trackEvent({ name: 'SignalR Connected', properties: { details: 'signalr react connection' } });
            register('statusUpdates', (args: any[]) => console.log('statusUpdates', args));
            setNotification({ message: 'SignalR Connected!' });
        } catch (error) {
            setNotification({ message: 'Cannot connect to SignalR service via socket', error: true });
        }
    }

    return (<Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={0}>
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}>

        </Stack>
        <ToggleButtonGroup
            fullWidth
            value={status}
            exclusive
            aria-label="User/Group"
            color="success">
            <ToggleButton value={'connected'} aria-label="Connected">
                <Tooltip title={'connected'}>
                    <BatteryChargingFull />
                </Tooltip>
            </ToggleButton>
            <ToggleButton value={'connecting'} aria-label="Connecting...">
                <Tooltip title={'connecting...'}>
                    <BatteryCharging50 />
                </Tooltip>
            </ToggleButton>
            <ToggleButton value={'disconnected'} aria-label="Disconnected">
                <Tooltip title="disconnected">
                    <Battery20 />
                </Tooltip>
            </ToggleButton>
        </ToggleButtonGroup>
    </Stack>);
}

export default SignalR;