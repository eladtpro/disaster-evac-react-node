import React, { useState } from 'react';
import { Grid } from '@mui/material';
//import { Routes, Route } from "react-router-dom";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from './core';
import { GLobalContext, initialValue } from "./state/GlobalContext";
//import loadingGif from './msft-office.gif'
import { Action, Notification, SignalR } from './components'

const App: React.FC = () => {
    const [notification, setNotification] = useState<{ message: React.ReactNode, error?: boolean } | undefined>(undefined);
    const [loading, setLoading] = useState<boolean | undefined>(undefined);

    return (
        <AppInsightsContext.Provider value={reactPlugin}>
            <GLobalContext.Provider value={{
                ...initialValue, loading, setLoading, notification, setNotification
            }}>
                <div>
                    <Grid container spacing={2}>
                        <Grid xs={12} item>
                            <SignalR />
                        </Grid>
                        <Grid xs={12} item>
                            <Action order={1} title={'Register Candidate'} status={'completed'} />
                            <Action order={2} title={'Determine Target Facility'} status={'processing'} />
                            <Action order={3} title={'Select Transportation To Facility'} status={'pending'} />
                            <Action order={4} title={'Verify Arrival to Transportation'} status={'pending'} />
                            <Action order={5} title={'Complete Process'} status={'pending'} />
                        </Grid>
                    </Grid>
                    <Notification message={notification?.message} error={notification?.error} open={!!notification}
                        onClose={() => setNotification(undefined)} autoHideDuration={notification?.error ? 0 : 6000} />
                </div>
            </GLobalContext.Provider>
        </AppInsightsContext.Provider>
    );
}

export default App;
