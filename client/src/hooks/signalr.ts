import axios from 'axios';
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import { configuration } from '../core';
import { useContext } from 'react';
import { GLobalContext } from '../state/GlobalContext';

export type ConnectionDetails = {
    url: string,
    accessToken: string
}

const useSignalR = () => {
    const { setNotification } = useContext(GLobalContext);
    let connection: HubConnection;

    const getConnectionDetails = async (): Promise<ConnectionDetails> => {
        const details = await axios
            .get<ConnectionDetails>(configuration.signalr.configEndpoint)
            .then(({ data }) => data)
        //.catch(console.error)
        return details;
    }

    const start = async (details?: ConnectionDetails): Promise<void> => {
        if (!details)
            details = await axios
                .get(configuration.signalr.configEndpoint)
                .then(({ data }) => data)
                .catch(console.error)

        connection = new HubConnectionBuilder()
            .withUrl(details!.url, {
                accessTokenFactory: () => details!.accessToken,
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.Trace)
            .withAutomaticReconnect()
            .build()

        connection.on('statusUpdates', data => {
            setNotification({ message: `[STATUSUPDATES] ${data}` });
        })


        connection.onclose(error => {
            if (error) {
                console.error(`${error.name}: ${error.message}`, error.stack);
                setNotification({ message: `[ONCLOSE] ${error.name}: ${error.message}`, error: true });
            }

            console.warn('signalr disconnected')
        });

        connection.onreconnecting(error => {
            console.error('err reconnecting  ', error);
            setNotification({ message: `[ONRECONNECTING] ${error}`, error: true });
        });

        await connection.start();
    }

    const stop = async (): Promise<void> => {
        if (!connection) return;
        await connection.stop()
    }

    const register = (methodName: string, newMethod: (...args: any[]) => void) => {
        connection.on(methodName, newMethod);
    }

    return {
        start,
        stop,
        register,
        getConnectionDetails
    };
}

export default useSignalR;


